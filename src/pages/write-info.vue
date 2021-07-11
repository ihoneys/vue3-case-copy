<template>
  <div class="write-wrapper">
    <HeaderSteps :steps="steps" />
    <div class="tabs-wrapper">
      <div
        v-for="(item, i) in tabsList"
        :key="i"
        :class="['tabs-item', curIndex === i ? 'active' : '']"
        @click="handleTabsItem(i)"
      >
        {{ item }}
      </div>
    </div>
    <ul class="colum-wrapper mb-10" v-show="curIndex">
      <li class="column-upload">
        <div class="column-upload-label">
          <span class="label-icon">*</span>
          <span>被委托人身份证</span>
        </div>
        <div class="uploader-wrapper">
          <div class="uploader-item positive-img">
            <van-uploader
              max-count="1"
              v-model="othersCardPositive"
              :before-read="uploadOthersCardPositive"
              accept="image/*"
              multiple
            />
            <div class="card-name">上传身份证正面</div>
          </div>
          <div class="uploader-item reverse-img">
            <van-uploader
              max-count="1"
              v-model="othersCardReverse"
              :before-read="uploadOthersCardReverse"
              accept="image/*"
              multiple
            />
            <div class="card-name">上传身份证反面面</div>
          </div>
          <div class="uploader-item">
            <van-uploader
              max-count="1"
              v-model="othersCardHand"
              :before-read="uploadOthersCardHand"
              accept="image/*"
              multiple
            />
            <div class="card-name">手持身份证</div>
          </div>
        </div>
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>被委托人姓名</span>
        </div>
        <van-field v-model="othersName" placeholder="请输入被委托人姓名" />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>证件号码</span>
        </div>
        <van-field v-model="othersCardId" placeholder="请输入被委托人身份证" />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>手机号码</span>
        </div>
        <van-field v-model="othersPhone" placeholder="请输入被委托人手机号" />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>关系</span>
        </div>
        <div class="selected" style="padding-right: 8px" @click="show = !show">
          <span>{{
            othersRelation ? othersRelation : "请选择与患者关系"
          }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
    </ul>
    <ul class="colum-wrapper">
      <li class="column-upload">
        <div class="column-upload-label">
          <span class="label-icon">*</span>
          <span>患者证件（身份证）</span>
        </div>
        <div class="uploader-wrapper">
          <div class="uploader-item positive-img">
            <van-uploader
              max-count="1"
              v-model="patientCardPositive"
              :before-read="uploadPatientCardPositive"
              accept="image/*"
              multiple
            />
            <div class="card-name">上传身份证正面</div>
          </div>
          <div class="uploader-item">
            <van-uploader
              max-count="1"
              :before-read="uploadPatientCardReverse"
              v-model="patientCardReverse"
              accept="image/*"
              multiple
            />
            <div class="card-name">上传身份证反面面</div>
          </div>
        </div>
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>患者姓名</span>
        </div>
        <van-field
          :rules="[{ required: true, message: '请填写用户名' }]"
          v-model="patientName"
          placeholder="请输入患者姓名"
        />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>证件号码</span>
        </div>
        <van-field
          maxlength="18"
          v-model="patientCardId"
          placeholder="请输入患者证件号码"
        />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>手机号码</span>
        </div>
        <van-field
          maxlength="11"
          v-model="patientPhone"
          placeholder="请输入患者手机号"
        />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>住院号</span>
        </div>
        <van-field
          type="number"
          v-model="hosNo"
          placeholder="请输入患者住院号"
        />
      </li>
    </ul>
    <div class="record-header headerline">住院记录</div>
    <div class="wrapper-record">
      <div class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>住院院区</span>
        </div>
        <van-field v-model="hospitalName" placeholder="请输入住院院区" />
      </div>
      <div class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>住院时间</span>
        </div>
        <div
          class="selected"
          style="padding-right: 8px"
          @click="handleDischargeTime('inHosTime')"
        >
          <span>{{ inHosTime ? inHosTime : "请选择入院时间" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </div>
      <div class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>出院时间</span>
        </div>
        <div
          class="selected"
          style="padding-right: 8px"
          @click="handleDischargeTime('outHosTime')"
        >
          <span>{{ outHosTime ? outHosTime : "请选择出院时间" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </div>
    </div>
    <div class="remarks-wrapper">
      <div>备注</div>
      <textarea
        v-model="feedback"
        class="remarks-text"
        row="3"
        placeholder="请输入反馈内容"
      ></textarea>
    </div>

    <div class="agreement-wrapper" @click="isSelected = !isSelected">
      <IYRadio :isSelected="isSelected" />
      <span className="agreement">我已阅读并同意</span>
      <span className="protocol" @click="handleProtocol">《病例复印协议》</span>
    </div>
    <van-popup
      v-model:show="showDate"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-datetime-picker
        v-model="curDate"
        type="date"
        title="选择时间"
        :min-date="minDate"
        :max-date="maxDate"
        :columns-order="['year', 'month', 'day']"
        @confirm="handelConfirmDate"
        @cancel="showDate = !showDate"
      />
    </van-popup>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="选择关系"
        :columns="columns"
        @confirm="confirmRelation"
        @cancel="show = !show"
      />
    </van-popup>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handleSave"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

import BottomButton from "@/components/bottom-button/Index.vue";
import HeaderSteps from "@/components/steps/Index.vue";
import IYRadio from "@/components/radio/Index.vue";

import {
  defineSteps,
  getYearsMonthDay,
  isObjEmpty,
  checkPhone,
  checkIdCard,
  createDialog,
} from "../utils/utils";

import {
  uploadImage,
  saveApplyRecord,
  saveApplyRecord,
  storageApplyRecord,
  getApplyRecordContext,
} from "@/service/api";
import { Dialog, Toast } from "vant";

const tabsList = ["本人办理", "他人代办"];
const columns = ["杭州", "宁波", "温州", "绍兴", "湖州", "嘉兴", "金华"];

const buttonContext = [
  {
    text: "下一步",
    styleBtn: {
      background: "linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)",
      boxShadow: "0px 4px 6px 0px rgba(0,155,143,0.17)",
      color: "#fff",
    },
  },
  { text: "暂存", styleWidth: {} },
];
export default defineComponent({
  name: "App",
  components: {
    HeaderSteps,
    BottomButton,
    IYRadio,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(route.query);
    const { recordId } = route.query;
    const { getters, commit, state: storeState, dispatch } = useStore();

    const {
      getIsMyself: isMyself,
      getNewWriteInfo: writeInfo,
      getRequestParams: requestParams,
    } = getters;

    if (recordId) {
      getApplyRecordContext(1064)
        .then((result) => {
          console.log(result);
          dispatch("changeStorageWriteInfoAction", result.data);
        })
        .catch((err) => {});
    }

    const newWriteInfo = Object.assign({}, writeInfo);

    const {
      othersCardPositive,
      othersCardReverse,
      othersCardHand,
      othersName,
      othersCardId,
      othersPhone,
      othersRelation,
      patientCardPositive,
      patientCardReverse,
      patientCardId,
      patientPhone,
      patientName,
      hospitalName,
      inHosTime,
      outHosTime,
      isSelected,
      feedback,
      hosNo,
    } = newWriteInfo;

    const { unitId } = requestParams;
    const curIndex = ref(isMyself);

    const steps = ref(defineSteps(!curIndex.value));

    const state = reactive({
      othersCardPositive, //委托人身份证正面
      othersCardReverse, // 反面
      othersCardHand, // 手持
      othersName,
      othersCardId, // 身份号
      othersPhone, // 电话号码
      othersRelation, // 与患者关系
      patientCardPositive, //患者身份证,
      patientCardReverse, //患者反面
      patientCardId,
      patientPhone, // 患者手机号
      patientName,
      hospitalName, // 院区
      hosNo,
      inHosTime, // 入院时间
      outHosTime, // 出院时间
      isSelected, // 是否勾选
      feedback,
      showDate: false,
      show: false,
      typeTime: "inHosTime",
      curDate: new Date(),
      newWriteInfoList: newWriteInfo,
      submissionDate: "",
    });

    watch(
      () => writeInfo,
      (cur, prev) => {
        state.othersCardReverse = cur.othersCardReverse;
        state.othersCardPositive = cur.othersCardPositive;
        state.othersCardHand = cur.othersCardHand;
        state.patientCardReverse = cur.patientCardReverse;
        state.othersCardId = cur.othersCardId;
        state.othersPhone = cur.othersPhone;
        state.othersRelation = cur.othersRelation;
        state.patientCardPositive = cur.patientCardPositive;
        state.patientCardId = cur.patientCardId;
        state.patientPhone = cur.patientPhone;
        state.patientName = cur.patientName;
        state.hospitalName = cur.hospitalName;
        state.inHosTime = cur.inHosTime;
        state.outHosTime = cur.outHosTime;
        state.feedback = cur.feedback;
        state.hosNo = cur.hosNo;
      },
      {
        deep: true,
      }
    );

    const handleTabsItem = (i) => {
      curIndex.value = i;
      steps.value = defineSteps(!i);
      dispatch("changeIsMyselfAction", i);
    };

    const handleDischargeTime = (type) => {
      state.showDate = !state.showDate;
      state.typeTime = type;
    };
    // 选择入出院时间
    const handelConfirmDate = (time) => {
      state.showDate = false;
      if (state.typeTime === "inHosTime") {
        state.inHosTime = timeFormat(time);
      } else {
        state.outHosTime = timeFormat(time);
      }
    };

    const timeFormat = (time) => {
      // 时间格式化
      const year = time.getFullYear();
      const month = time.getMonth() + 1;
      const day = time.getDate();
      return year + "年" + month + "月" + day + "日";
    };

    const confirmRelation = (val) => {
      state.show = false;
      state.othersRelation = val;
    };

    const createMessage = (message) => {
      Toast.fail(message);
    };

    const uploadRequestFunc = (file, key) => {
      const fd = new FormData();
      fd.append("file", file);
      uploadImage(unitId, fd)
        .then((res) => {
          const { data } = res;
          if (isObjEmpty(data)) {
            createMessage("上传失败！");
            return false;
          } else {
            console.log(state[key]);
            state[key].push({
              url: res.data.url,
              isImage: true,
            });
            return true;
          }
        })
        .catch((err) => {
          createMessage("上传失败！");
          return false;
        });
    };

    // 上传患者证件
    const uploadPatientCardPositive = (file) => {
      // uploadRequestFunc(file, "patientCardPositive");
      return true;
    };

    // 上传身份证反面
    const uploadPatientCardReverse = (file) => {
      uploadRequestFunc(file, "patientCardReverse");
    };

    // 上传被委托人身份证正面
    const uploadOthersCardPositive = (file) => {
      console.log(file);
      uploadRequestFunc(file, "othersCardPositive");
    };

    // 上传被委托人身份证反面
    const uploadOthersCardReverse = (file) => {
      uploadRequestFunc(file, "othersCardReverse");
    };

    // 被委托人手持身份证
    const uploadOthersCardHand = (file) => {
      uploadRequestFunc(file, "othersCardHand");
    };

    const saveData = () => {
      const patientData = {
        patientPhone: state.patientPhone,
        patientName: state.patientName,
        patientIdCardPros:
          state.patientCardPositive.length > 0 &&
          state.patientCardPositive[0].url,
        patientIdCardCons:
          state.patientCardReverse.length > 0 &&
          state.patientCardReverse[0].url,
        patientIdCardNo: state.patientCardId,
        patientHosCardNo: state.hosNo,
        inHosTime: state.inHosTime,
        outHosTime: state.outHosTime,
        inHosArea: state.hospitalName,
        applyType: !!curIndex,
        remark: state.feedback,
      };

      const ohtersData = {
        clientIdCardCons:
          state.othersCardReverse.length > 0 && state.othersCardReverse[0].url,
        clientIdCardHold:
          state.othersCardHand.length > 0 && state.othersCardHand[0].url,
        clientIdCardPros:
          state.patientCardPositive.length > 0 &&
          state.patientCardPositive[0].url,
        clientName: state.othersName,
        clientNameRelation: state.othersRelation,
        clientPhone: state.othersPhone,
      };
      return !!curIndex ? patientData : Object.assign(patientData, ohtersData);
    };

    const handleNext = async () => {
      if (!validatePatientFrom()) return;
      if (curIndex.value === 1) {
        if (!validateOthersFrom()) return;
      }
      // const data = saveData();
      // const res = await saveApplyRecord(data);
      // if (res.data) {
      //   commit("changeApplyRecordId", res.data);
      // }
      // // 提交成功时间
      // state.submissionDate = getYearsMonthDay(true);
      // commit("changeWriteInfo", toRaw(state));
      // Toast.clear();
      // setTimeout(() => {
      //   const nextPath = curIndex.value === 1 ? "/signture" : "/copy";
      //   router.push(nextPath);
      // });
    };

    const validatePatientFrom = () => {
      const patientRules = [
        {
          value: !state.patientCardPositive.length,
          text: "未上传患者身份证正面！",
        },
        {
          value: !state.patientCardReverse.length,
          text: "未上传患者身份证反面！",
        },
        {
          value: !state.patientName.replace(/\s/g, ""),
          text: "患者姓名不能为空！",
        },
        {
          value: !checkPhone(state.patientPhone),
          text: "患者手机号不正确！",
        },
        {
          value: !checkIdCard(state.patientCardId),
          text: "患者身份证不正确",
        },
        {
          value: !state.hosNo.replace(/\s/g, ""),
          text: "住院号为空！",
        },
        {
          value: !state.inHosTime,
          text: "请选择入院时间！",
        },
        {
          value: !state.outHosTime,
          text: "请选择出院时间！",
        },
      ];
      return validateFunc(patientRules);
    };

    const validateOthersFrom = () => {
      const othersRules = [
        {
          value: !state.othersCardPositive.length,
          text: "未上传被委托人身份证正面！",
        },
        {
          value: !state.othersCardReverse.length,
          text: "未上传被委托人身份证反面！",
        },
        {
          value: !state.othersCardHand.length,
          text: "未上传被委托人手持身份证照",
        },
        {
          value: !state.othersName.replace(/\s/g, ""),
          text: "被委托人姓名不能为空！",
        },
        {
          value: !checkPhone(state.othersPhone),
          text: "被委托人手机号填写不正确！",
        },
        {
          value: !checkIdCard(state.othersCardId),
          text: "被委托人身份证不正确",
        },
        {
          value: !state.othersRelation.length,
          text: "请选择与患者关系",
        },
      ];
      return validateFunc(othersRules);
    };
    const validateFunc = (arr) => {
      const action = arr.filter((item) => !item.value);
      if (action.length) {
        createDialog(action[0].text);
        return false;
      } else {
        return true;
      }
    };
    const handleSave = async () => {
      const data = saveData();
      const res = await storageApplyRecord(data);
      if (res.data) {
        commit("changeApplyRecordId", res.data);
      }
    };

    return {
      ...toRefs(state),
      steps,
      tabsList,
      curIndex,
      columns,
      buttonContext,
      minDate: new Date(2010, 1, 1),
      maxDate: new Date(2025, 10, 1),
      handleTabsItem,
      handleDischargeTime,
      handelConfirmDate,
      confirmRelation,
      handleNext,
      uploadPatientCardPositive,
      uploadPatientCardReverse,
      uploadOthersCardPositive,
      uploadOthersCardReverse,
      uploadOthersCardHand,
      handleSave,
    };
  },
});
</script>
<style lang="scss" scoped>
.active {
  color: #00c6b8;
  background-color: #fff !important;
}
.write-wrapper {
  background-color: #f5f5f5;
  padding-bottom: 66px;
}
.tabs-wrapper {
  display: flex;
  align-items: center;
  background-color: #ededed;
  .tabs-item {
    width: 50%;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    background-color: #f5f5f5;
    border-top-left-radius: 0.16rem;
    border-top-right-radius: 0.16rem;
    font-size: 0.16rem;
    font-weight: 500;
  }
}
.column-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  font-size: 16px !important;
  & :deep() .van-field__control {
    text-align: right !important;
  }

  .column-item-left {
    width: 165px;
  }
}
.colum-wrapper {
  padding-left: 15px;
  .column-upload {
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: visible;
  }

  .uploader-wrapper {
    display: flex;
    padding-right: 10px;
    .positive-img{
       & :deep() .van-uploader__upload {
        background-image: url("../assets/img/positive.png");
        background-size: 100%;
      }
    }
    /* .reverse-img{

    } */
    .uploader-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
       & :deep() .van-uploader__upload {
        width: 108px !important;
        height: 68px !important;
      }
      & :deep() .van-uploader__preview-image {
        width: 108px !important;
        height: 68px !important;
      }
    }
    .card-name {
      color: #999999;
      font-size: 0.13rem;
    }
  }
}
.label-icon {
  color: #f65c44;
  padding-right: 0.07rem;
  font-size: 0.12rem;
}
.column-upload-label {
  height: 44px;
  line-height: 44px;
}
.next-icon {
  width: 24px;
  height: 24px;
}
.selected {
  display: flex;
  align-items: center;
}
.record-header {
  font-size: 0.15rem;
  padding: 0.15rem;
}
.remarks-wrapper {
  padding: 0.15rem;
  background-color: #fff;
}
.remarks-text {
  width: 98.5%;
  height: 80px;
  background-color: #f5f5f5;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.agreement-wrapper {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  .agreement {
    color: #666666;
    font-size: 0.12rem;
    margin-left: 10px;
  }
  .protocol {
    color: #00c6b8;
    font-size: 0.12rem;
  }
}
.wrapper-record {
  background-color: #fff;
  padding-left: 15px;
}
</style>