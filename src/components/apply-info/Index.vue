<template>
  <ul class="apply-wrapper">
    <li>
      <span className="headerline">申请信息</span>
    </li>
    <li v-if="applyInfo.othersName && applyInfo.isMyself === 1">
      <span className="content-name">申请人：</span>
      <span className="content-text">{{ applyInfo.othersName }}</span>
    </li>
    <li v-if="applyInfo.outTradeNo">
      <span className="content-name">申请订单号：</span>
      <span className="content-text">{{ applyInfo.outTradeNo }}</span>
    </li>
    <li v-if="applyInfo.othersCardId && applyInfo.isMyself === 1">
      <span className="content-name">申请人证件号：</span>
      <span className="content-text">{{ applyInfo.othersCardId }}</span>
    </li>
    <li>
      <span className="content-name">申请人手机号：</span>
      <span className="content-text">{{
        applyInfo.othersPhone ? applyInfo.othersPhone : applyInfo.patientPhone
      }}</span>
    </li>
    <li>
      <span className="content-name">申请医院：</span>
      <span className="content-text">{{ applyInfo.hospitalName }}</span>
    </li>
    <li>
      <span className="content-name">患者姓名：</span>
      <span className="content-text">{{ applyInfo.patientName }}</span>
    </li>
    <li>
      <span className="content-name">患者身份证：</span>
      <span className="content-text">{{ applyInfo.patientCardId }}</span>
    </li>
    <li>
      <span className="content-name">住院号：</span>
      <span className="content-text">{{ applyInfo.hosNo }}</span>
    </li>
    <li>
      <span className="content-name">提交日期：</span>
      <span className="content-text">{{ applyInfo.submissionDate }}</span>
    </li>
    <li>
      <span className="content-name">预交费用：</span>
      <span className="content-text line-h-20"
        ><span style="color: #f26317">¥{{ fee }}</span
        >（预缴费用不等于实际费用不等于实际费用）</span
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ApplyContent",
  props: {
    applyInfo: {
      type: Object,
      default: () => {},
    },
    fee: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props) {
    console.log(props.applyInfo);
  },
});
</script>

<style lang="scss" scoped>
.apply-wrapper {
  font-size: 0.15rem;
  li {
    margin-top: 0.2rem;
    &:first-child {
      margin-top: 0rem;
    }
  }
  .headerline {
    color: #333;
    font-size: 0.18rem;
    font-weight: bold;
  }
  .content-name {
    color: #999;
  }
  .content-text {
    color: #333;
  }
}
</style>
