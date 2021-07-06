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
          <div class="uploader-item">
            <van-uploader max-count="1" v-model="othersCardPositive" />
            <div class="card-name">上传身份证正面</div>
          </div>
          <div class="uploader-item">
            <van-uploader max-count="1" v-model="othersCardReverse" />
            <div class="card-name">上传身份证反面面</div>
          </div>
          <div class="uploader-item">
            <van-uploader max-count="1" v-model="othersCardHand" />
            <div class="card-name">手持身份证</div>
          </div>
        </div>
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
            othersRelation ? othersRelation : '请选择与患者关系'
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
          <div class="uploader-item">
            <van-uploader max-count="1" v-model="patientCardPositive" />
            <div class="card-name">上传身份证正面</div>
          </div>
          <div class="uploader-item">
            <van-uploader max-count="1" v-model="patientCardReverse" />
            <div class="card-name">上传身份证反面面</div>
          </div>
        </div>
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>证件号码</span>
        </div>
        <van-field v-model="patientCardId" placeholder="请输入患者证件号码" />
      </li>
      <li class="column-item">
        <div class="column-item-left">
          <span class="label-icon">*</span>
          <span>手机号码</span>
        </div>
        <van-field v-model="patientPhone" placeholder="请输入患者手机号" />
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
          @click="handleDischargeTime"
        >
          <span>{{
            currentSelectedDate ? dischargedTime : '请选择出院时间'
          }}</span>
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
        v-model="dischargedTime"
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
    <BottomButton :isSingle="false" :buttonContext="buttonContext" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex'

import BottomButton from "@/components/bottom-button/Index.vue"
import HeaderSteps from "@/components/steps/Index.vue";
import IYRadio from "@/components/radio/Index.vue";

import { defineSteps } from '../utils/utils';

const tabsList = ["本人办理", "他人代办"];
const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'];

const buttonContext = [{
  text: "下一步", styleBtn: {
    background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
    boxShadow: '0px 4px 6px 0px rgba(0,155,143,0.17)',
    color: '#fff',
  },
}, { text: "暂存", styleWidth: {} }]
export default defineComponent({
  name: 'App',
  components: {
    HeaderSteps,
    BottomButton,
    IYRadio
  },
  setup() {
    const curIndex = ref(0)

    const steps = ref(defineSteps(!curIndex.value))

    const state = reactive({
      othersCardPositive: [], //委托人身份证正面
      othersCardReverse: [], // 反面
      othersCardHand: [], // 手持
      othersCardId: "", // 身份号
      othersPhone: "", // 电话号码
      othersRelation: "", // 与患者关系
      patientCardPositive: [], //患者身份证,
      patientCardReverse: [], //患者反面
      patientCardId: "",
      patientPhone: "", // 患者手机号
      hospitalName: "", //院区
      dischargedTime: new Date(), // 出院时间
      isSelected: false, // 是否勾选
      feedback: "",
      showDate: false,
      currentSelectedDate: "",
      show: false
    })

    const { commit, dispatch } = useStore()

    const handleTabsItem = (i) => {
      curIndex.value = i
      steps.value = defineSteps(!i)
      console.log(steps.value)
      dispatch("changeIsMyselfAction", i)
    }

    const handleDischargeTime = () => {
      state.showDate = !state.showDate
    }
    // 获取时间
    const handelConfirmDate = (val) => {
      state.showDate = false
      state.dischargedTime = val
      state.currentSelectedDate = val
    }

    const confirmRelation = (val) => {
      console.log(66)
      state.show = false
      state.othersRelation = val
    }
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
      confirmRelation
    }
  }
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
  height: 44px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
  & :deep() .van-field__control {
    text-align: right !important;
  }
  .column-item-left {
    width: 150px;
  }
}
.colum-wrapper {
  padding-left: 15px;
  .column-upload {
    display: flex;
    flex-direction: column;
  }

  .uploader-wrapper {
    display: flex;
    padding-right: 10px;
    .uploader-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 15px;
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
.wrapper-record{
  background-color: #fff;
  padding-left: 15px;
}
</style>