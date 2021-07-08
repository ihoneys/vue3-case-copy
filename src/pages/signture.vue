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
        <li>
          <span class="column-name">委托事项：</span>
          <span class="matter">{{ matter }}</span>
        </li>
      </ul>
      <div class="signature-column">
        <span class="column-width">被委托人签名：</span>
        <van-image
          v-if="signImage"
          width="1.02rem"
          height="0.3rem"
          fit="cover"
          :src="signImage"
        />
      </div>
      <div class="signature-column">
        <span class="column-width">时间：</span>
        <span>{{ currentDate }}</span>
      </div>
      <button class="entrusted" @click="signShow = true">被委托人签名</button>
    </div>
    <div v-show="signShow" class="mask-wrapper">
      <div class="content-wrapper">
        <div class="close-sign" @click="signShow = false">
          <van-icon color="#ffffff" size=".24rem" name="cross" />
        </div>
        <div class="title">被委托人签名</div>
        <div class="sign-area">
          <canvas class="sign-canvas" id="signCanvas" />
          <!-- 签名区域 -->
        </div>
        <div class="confirm-btn">
          <button class="confirm reset" @click="handleReset">重置</button>
          <button class="confirm" @click="confirmSign">确认</button>
        </div>
      </div>
    </div>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { Toast } from 'vant';

import BottomButton from '@/components/bottom-button/Index.vue';
import HeaderSteps from '@/components/steps/Index.vue';

import { defineSteps, isObjEmpty, getYearsMonthDay } from '../utils/utils';
import {
  getEntrustedMattersByParams,
  uploadImageBas64,
  saveMatterContent,
} from '@/service/api';

import SignturePad from 'signature_pad';
import html2canvas from 'html2canvas';

const buttonContext = [
  {
    text: '下一步',
    styleBtn: {
      background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
      boxShadow: '0rem .04rem .06rem 0rem rgba(0,155,143,0.17)',
      color: '#fff',
    },
  },
  { text: '上一步', styleWidth: {} },
];
export default defineComponent({
  name: 'signture',
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
    } = getters;

    const signShow = ref(false);
    const signImage = ref(getSignImage);
    const currentDate = getYearsMonthDay();
    let powerAttorneyPic = '';

    const { patientName, patientCardId, othersName, othersCardId } = writeInfo;

    const state = reactive({
      patientName,
      patientCardId,
      othersName,
      othersCardId,
      matter:
        '因复印需要，委托我的xx关系xx姓名为我的代理人，前往xxx医院复印我在xx科室住院治疗的病例资料，委托人签署该授权委托书真实有效，如有不实，本人承担全部法律责任。',
    });

    onMounted(async () => {
      const data = {
        unitId: requestParams.unitId,
        clientNameRelation: writeInfo.othersRelation,
        patientName,
        inHosArea: writeInfo.hospitalName,
      };
      const { data: matter } = await getEntrustedMattersByParams(data);
      if (matter) {
        state.matter = matter;
      }
    });

    let signaturePad;

    const initSign = () => {
      let canvas = document.getElementById('signCanvas');
      signaturePad = new SignturePad(canvas, {
        penColor: '#333',
        backgroundColor: '#f5f5f5',
      });
    };

    const _uploadImageFunc = async (imageBse64, isSign = true) => {
      const fd = new FormData();
      fd.append('base64Data', imageBse64);
      const res = await uploadImageBas64(fd);
      const { data } = res;
      if (isObjEmpty(data)) {
        createMessage('上传失败！');
      } else {
        if (isSign) {
          signImage.value = data.url;
          commit('changeSignImage', data.url);
        } else {
          powerAttorneyPic = data.url;
        }
      }
    };

    const confirmSign = () => {
      if (signaturePad.isEmpty()) {
        return Toast('请签名');
      }
      const imageBse64 = signaturePad.toDataURL('image/jpeg');
      signShow.value = false;
      _uploadImageFunc(imageBse64);
    };

    const getImageAndNext = async () => {
      const contentCavans = document.getElementById('content');
      const canvas = await html2canvas(contentCavans, {
        backgroundColor: null, //画出来的图片有白色的边框,不要可设置背景为透明色（null）
        useCORS: true, //支持图片跨域
        scale: 1, //设置放大的倍数
      });
      const imageBas64 = canvas.toDataURL('image/jpeg');
      _uploadImageFunc(imageBas64, false);

      const data = {
        applyId: applyRecordId,
        clientIdCardNo: othersCardId,
        clientName: othersName,
        clientSignature: signImage.value,
        powerAttorneyPic,
      };
      const { returnCode } = await saveMatterContent(data);
      if (returnCode === 0) {
        router.push('/copy');
      } else {
        createMessage(returnMsg);
      }
      // const img = new Image();
      // img.src = canvas.toDataURL('image/png');
      // document.querySelector('.signture-wrapper').appendChild(img);
    };

    onMounted(() => {
      initSign();
    });

    const handleNext = () => {
      getImageAndNext();
    };

    const handlePrev = () => {
      router.push('/write');
    };

    const handleReset = () => {
      signaturePad.clear();
    };

    const createMessage = (message) => {
      Toast.fail(message);
    };

    return {
      ...toRefs(state),
      signShow,
      defineSteps,
      buttonContext,
      handleNext,
      handlePrev,
      initSign,
      handleReset,
      confirmSign,
      signImage,
      currentDate,
    };
  },
});
</script>

<style lang="scss" scoped>
.sign-canvas {
  width: 100%;
  height: 1.42rem;
}
.signture-wrapper {
  background-color: #ffffff;
  .title {
    text-align: center;
  }
  .content {
    padding: 0.2rem 0.15rem;
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
    .sign-image {
      width: 1.02rem;
      height: 0.3rem;
    }
  }
  .column-width {
    display: inline-block;
    width: 65%;
    text-align: right;
    color: #999999;
  }
  .entrusted {
    background-color: #ffffff;
    font-weight: 500;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    border: 0.01rem solid #979797;
    width: 1.68rem;
    height: 0.44rem;
    text-align: center;
    line-height: 0.42rem;
    margin-top: 0.4rem;
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
  .sign-area {
    box-sizing: border-box;
    width: 100%;
    height: 1.42rem;
    border: 0.02rem dashed #00c6b8;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.18rem;
    color: #999;
    padding: 0.8rem 0.1rem;
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
