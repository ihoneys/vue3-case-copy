<template>
  <div class="signture-wrapper">
    <HeaderSteps :currentIndex="1.1" :steps="defineSteps()" />
    <div class="content" id="content">
      <h4 class="title">病案复印授权委托书</h4>
      <ul class="content-list">
        <li>
          <span class="column-name">委托人姓名：</span>
          <span class="">{{ patientName }}</span>
        </li>
        <li>
          <span class="column-name">委托人身份证：</span>
          <span>{{ patientCardId }}</span>
        </li>
        <li>
          <span class="column-name">被委托人姓名：</span>
          <span>{{ othersName }}</span>
        </li>
        <li>
          <span class="column-name">被委托人身份证：</span>
          <span>{{ othersCardId }}</span>
        </li>
        <li v-if="matter">
          <span class="column-name">委托事项：</span>
          <span class="matter">{{ matter }}</span>
        </li>
      </ul>
      <div class="signature-column">
        <span class="column-width">被委托人签名：</span>
        <van-image
          v-show="signImage"
          width="1.02rem"
          height="0.3rem"
          fit="cover"
          :src="signImage"
        />
      </div>
      <div class="signature-column">
        <span class="column-width">委托人签名：</span>
        <van-image
          v-show="clientImage"
          width="1.02rem"
          height="0.3rem"
          fit="cover"
          :src="clientImage"
        />
      </div>
      <div class="signature-column">
        <span class="column-width">时间：</span>
        <span class="sign-time">{{ currentDate }}</span>
      </div>
      <div class="open-sign">
        <div class="entrusted margin-right" @click="openSign('BE')">
          被委托人签名
        </div>
        <div class="entrusted" @click="openSign('NO_BE')">委托人签名</div>
      </div>
    </div>
    <van-overlay v-model:show="signShow" z-index="99">
      <div class="content-wrapper">
        <div class="close-sign" @click="signShow = false">
          <van-icon color="#ffffff" size=".24rem" name="cross" />
        </div>
        <div class="title">{{ signTitle }}</div>
        <canvas class="sign-canvas" id="signCanvas" />
        <div class="confirm-btn">
          <button class="confirm reset" @click="handleReset">重置</button>
          <button class="confirm" @click="confirmSign">确认</button>
        </div>
      </div>
    </van-overlay>

    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { Toast } from "vant";

import BottomButton from "@/components/bottom-button/Index.vue";
import HeaderSteps from "@/components/steps/Index.vue";

import { defineSteps, isObjEmpty, getYearsMonthDay } from "../utils/utils";
import {
  getEntrustedMattersByParams,
  uploadImageBas64,
  saveMatterContent,
  getPowerAttorney,
} from "@/service/api";

import SignturePad from "signature_pad";
import html2canvas from "html2canvas";

const buttonContext = [
  {
    text: "下一步",
    styleBtn: {
      background: "linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)",
      boxShadow: "0rem .04rem .06rem 0rem rgba(0,155,143,0.17)",
      color: "#fff",
    },
  },
  { text: "上一步", styleWidth: {} },
];
export default defineComponent({
  name: "signture",
  components: {
    HeaderSteps,
    BottomButton,
  },
  setup() {
    const router = useRouter();
    const { getters, commit } = useStore();
    const {
      getNewWriteInfo: writeInfo,
      getRequestParams: requestParams,
      getApplyRecordId: applyRecordId,
      getSignImage,
      getClientImage,
      getIsResetWrite: isResetWrite,
    } = getters;

    const signShow = ref(false);
    const signImage = ref(getSignImage);
    const clientImage = ref(getClientImage);
    const signTitle = ref("");
    const curSign = ref("BE");

    const canvasStyle = ref({
      width: 375 + "px",
    });

    const currentDate = getYearsMonthDay();
    let powerAttorneyPic = "";

    const newWriteInfo = Object.assign({}, writeInfo);
    const { patientName, patientCardId, othersName, othersCardId } =
      newWriteInfo;

    const state = reactive({
      patientName,
      patientCardId,
      othersName,
      othersCardId,
      matter: "",
      id: null,
    });

    onMounted(() => {
      const data = {
        unitId: requestParams.unitId,
        clientNameRelation: writeInfo.othersRelation,
        patientName,
        inHosArea: writeInfo.hospitalName,
      };
      // 获取委托事项说明
      getEntrustedMattersByParams(data).then((res) => {
        const { data: matter } = res;
        if (matter) {
          state.matter = matter;
        }
      });

      if (isResetWrite) {
        getPowerAttorneyRequest();
      }
    });

    // 重填获取委托书信息
    const getPowerAttorneyRequest = async () => {
      const { data } = await getPowerAttorney(applyRecordId);
      if (!isObjEmpty(data)) {
        console.log(data);
        state.patientName = data.patientName;
        state.patientCardId = data.patientIdCardNo;
        state.othersName = data.clientName;
        state.othersCardId = data.clientIdCardNo;
        state.id = data.id;
        signImage.value = data.clientSignature;
        clientImage.value = data.patientSignature
      }
    };

    // 初始化签名类
    let signaturePad;
    const initSign = () => {
      const canvas = document.getElementById("signCanvas") as HTMLCanvasElement;

      canvas.width = document.documentElement.clientWidth - 5;

      signaturePad = new SignturePad(canvas, {
        penColor: "#333",
        backgroundColor: "#f5f5f5",
      });
    };

    // 上传图片
    const _uploadImageFunc = (imageBse64, isSign = true) => {
      return new Promise(async (resolve, reject) => {
        const fd = new FormData();
        fd.append("base64Data", imageBse64);
        const res = await uploadImageBas64(fd);
        const { data } = res;
        if (!isObjEmpty(data)) {
          if (!isSign) {
            // 如果是上传截图 则赋值保存
            powerAttorneyPic = data.url;
          }
          resolve(data.url);
        } else {
          createMessage("上传失败！");
          reject("上传失败！");
        }
      });
    };

    // 截图整个委托书
    const getImageAndNext = async () => {
      if (!signImage.value) {
        createMessage("被委托人未签名！");
        return;
      }
      const contentCavans = document.getElementById("content") as HTMLElement;
      const canvas = await html2canvas(contentCavans, {
        backgroundColor: "#FFFFFF", //画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true, //支持图片跨域
        scale: 1, //设置放大的倍数
      });
      const imageBas64 = canvas.toDataURL("image/jpeg");

      const resUrl = await _uploadImageFunc(imageBas64, false);

      const data = {
        applyId: applyRecordId,
        clientIdCardNo: othersCardId,
        clientName: othersName,
        patientName: patientName,
        patientIdCardNo: patientCardId,
        clientSignature: signImage.value,
        patientSignature: clientImage.value,
        powerAttorneyPic: resUrl,
      };
      const { returnCode, returnMsg } = await saveMatterContent(data);

      if (returnCode === 0) {
        router.push("/copy");
      } else {
        createMessage(returnMsg);
      }

      // const img = new Image();
      // img.src = canvas.toDataURL("image/png");
      // document.querySelector(".signture-wrapper").appendChild(img);
    };

    // 去人签名并上传
    const confirmSign = async () => {
      if (signaturePad.isEmpty()) {
        return Toast("请签名");
      }
      const imageBse64 = signaturePad.toDataURL("image/jpeg");
      signShow.value = false;

      const url = await _uploadImageFunc(imageBse64);
      console.log(url);
      if (curSign.value === "BE") {
        signImage.value = url;
        commit("changeSignImage", url);
      } else {
        clientImage.value = url;
        commit("changeClientImage", url);
      }
    };

    const handleNext = () => {
      getImageAndNext();
    };

    const handlePrev = () => {
      router.go(-1);
    };

    const handleReset = () => {
      signaturePad.clear();
    };

    const createMessage = (message) => {
      Toast.fail(message);
    };

    // 打开签名
    const openSign = (query) => {
      signTitle.value = query === "BE" ? "被委托人签名" : "委托人签名";
      curSign.value = query;

      signShow.value = true;
      setTimeout(() => {
        initSign();
      });
    };

    return {
      ...toRefs(state),
      signShow,
      defineSteps,
      buttonContext,
      handleNext,
      handlePrev,
      handleReset,
      confirmSign,
      signImage,
      clientImage,
      currentDate,
      canvasStyle,
      openSign,
      signTitle,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}
.sign-canvas {
  background-color: #f5f5f5;
  border: 0.02rem dashed #00c6b8;
  box-sizing: border-box;
}
.signture-wrapper {
  background-color: #ffffff;
  .title {
    text-align: center;
  }
  .content {
    padding: 0.2rem 0.15rem 0 0.2rem;
    padding-bottom: 1.28rem;
    height: 100%;
    font-size: 0.16rem;
    box-sizing: border-box;
  }
  .content-list li {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .column-name {
    color: #999999;
  }
  .matter {
    line-height: 0.24rem;
  }
  .signature-column {
    margin-top: 0.1rem;
    display: flex;
    align-items: center;
    .sign-time {
      display: inline-block;
      width: 1.2rem;
    }
  }
  .column-width {
    display: inline-block;
    min-width: 65%;
    text-align: right;
    color: #999999;
  }
  .open-sign {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .entrusted {
    background-color: #ffffff;
    font-weight: 500;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    border: 0.01rem solid #979797;
    text-align: center;
    line-height: 0.44rem;
    margin-top: 0.4rem;
    flex: 1;
  }
  .margin-right {
    margin-right: 20px;
  }
}
.mask-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
}
.content-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  z-index: 200;
  width: 100%;
  .title {
    font-size: 0.24rem;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .confirm {
    width: 1.67rem;
    height: 0.44rem;
    background: #ffffff;
    border-radius: 0.24rem;
    color: #00c6b8;
    font-size: 0.16rem;
  }
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 0.1rem;
  }
  .reset {
    color: #333;
  }
  .write-name-canvas {
    width: 3.75rem;
    height: 1.2rem;
  }
  .am-icon {
    color: #ffffff;
    width: 0.3rem;
    height: 0.3rem;
  }
  .close-sign {
    position: absolute;
    right: 0.1rem;
    top: -0.5rem;
  }
}
</style>
