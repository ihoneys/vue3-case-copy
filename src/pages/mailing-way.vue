<template>
  <div class="steps">
    <ul>
      <HeaderSteps :steps="steps"  :currentIndex="1"/>
      <li class="column-flex">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>领取方式</span>
        </div>
        <van-radio-group
          @change="watchChange"
          v-model="checked"
          direction="horizontal"
        >
          <van-radio name="1">邮寄到付</van-radio>
          <van-radio name="2">到院自取</van-radio>
        </van-radio-group>
      </li>
      <li class="column-flex" v-if="checked === '1'">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>快递公司</span>
        </div>
        <div class="pd-r-15">EMS</div>
      </li>
      <li class="column-flex" v-if="checked === '1'" @click="handleAddress">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>邮寄地址</span>
        </div>
        <div class="selected" style="padding-right: .08rem">
          <span>{{ currentAddress ? currentAddress : "请选择" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <template v-if="checked === '2'">
        <div class="express-wrapper">
          <div class="column-flex-left">
            <span class="label-icon">*</span>
            <span>院内领取地址</span>
          </div>
        </div>
        <div class="take-address">
          南山医院门诊综合楼负一楼病案管理科 备注： 取件时间：工作日：8:00-12:00
        </div>
      </template>
      <div class="user-tips">
        <div>温馨提醒</div>
        <p class="tips-content">
          除年龄小于1岁患者可由委托人网上预约病案复印，其他患者仅由本人网上申请，如需要委托人办理，请到窗口办理。
        </p>
      </div>
    </ul>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import HeaderSteps from "@/components/steps/Index.vue";
import BottomButton from "@/components/bottom-button/Index.vue";

import { defineSteps } from "../utils/utils";

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
  name: "App",
  components: {
    HeaderSteps,
    BottomButton,
  },
  setup() {
    const { getters, dispatch } = useStore();
    const router = useRouter();

    const { getIsMyself, getCurrentAddress, getIsTake } = getters;

    console.log(getters.getIsMyself);
    const checked = ref<String>(getIsTake);

    const watchChange = (val) => {
      checked.value = val;
      dispatch("changeIsTakeAction", val);
    };

    const handleAddress = () => {
      router.push("/address");
    };

    const handleNext = () => {
      router.push("/payOrder")
    };

    const handlePrev = () => {
      router.push("/copy")
    }
    return {
      steps: defineSteps(!getIsMyself),
      show: false,
      checked,
      currentAddress: getCurrentAddress,
      watchChange,
      handleAddress,
      buttonContext,
      handleNext,
      handlePrev
    };
  },
});
</script>

<style lang="scss" scoped>
.steps {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.column-flex-left {
  width: 1.2rem;
}
.column-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: .44rem;
  border-bottom: .01rem solid #f5f5f5;
  padding-left: .15rem;
  font-size: .15rem;
  & :deep() .van-radio--horizontal {
    margin-right: 0;
    padding-right: .15rem;
  }
  .next-icon {
    width: .24rem;
    height: .24rem;
  }
  .selected {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
}
.label-icon {
  color: #f65c44;
  margin-right: 0.07rem;
}
.take-address {
  width: 85%;
  padding-left: .28rem;
  line-height: .24rem;
}
.express-wrapper {
  height: .44rem;
  padding-left: .15rem;
  line-height: .44rem;
}
.user-tips {
  padding: .15rem;
  background-color: #f5f5f5;
}
.tips-content {
  color: #666666;
  font-size: .12rem;
  line-height: .2rem;
  margin-top: .04rem;
  background-color: #f5f5f5;
}
</style>
