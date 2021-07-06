<template>
  <div class="detail-wrapper">
    <div class="background"></div>
    <!-- <div class="count-wrapper">
      <img class="count-icon" src="@/assets/img/count-down.png" alt="" />
      <div class="count-time">
        <span class="time">等待支付倒计时：</span>
        <van-count-down :time="time">
          <template #default="timeData">
            <span class="time" v-if="timeData.hours">{{ timeData.hours }}</span>
            <span class="time" v-if="timeData.hours">:</span>
            <span class="time">{{ timeData.minutes }}</span>
            <span class="time">:</span>
            <span class="time">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
    </div> -->
    <OrderSteps :currentIndex="currentIndex" />
    <div class="apply-info-box">
      <ApplyContent />
    </div>
    <div class="apply-info-box">
      <h3 class="headerline">领取信息</h3>
      <div class="address-info">
        <img
          class="address-icon"
          src="@/assets/img/address-icon.png"
          alt="address"
        />
        <div class="info">
          <div>
            <span class="info-name">毛拉啊啊</span>
            <span class="info-phone">15000561564</span>
          </div>
          <p class="info-text">广东省深圳市南山区贝培大道锡山家园274</p>
        </div>
        <img class="arrow-icon" src="@/assets/img/next.png" alt="next" />
      </div>
    </div>
    <BottomButton :isSingle="false" :buttonContext="buttonContext" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import OrderSteps from '@/components/steps-order/Index.vue';
import ApplyContent from '@/components/apply-info/Index.vue';
import BottomButton from '@/components/bottom-button/Index.vue';

const buttonContext = [
  {
    text: '去支付',
    styleBtn: {
      background: '#FFAE17',
      border: '1px solid #FFAE17',
      color: '#fff',
    },
  },
  { text: '取消申请', styleWidth: {} },
];
export default defineComponent({
  name: 'detail',
  components: {
    OrderSteps,
    ApplyContent,
    BottomButton,
  },
  setup() {
    return {
      currentIndex: 1,
      time: 290000,
      buttonContext,
    };
  },
});
</script>

<style lang="scss" scope>
.detail-wrapper {
  min-height: 100vh;
  padding: 0.1rem 0.12rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
  .apply-info-box {
    padding: 0.2rem 0.15rem;
    border-radius: 0.08rem;
    font-size: 0.15rem;
    margin-top: 0.1rem;
    background-color: #ffffff;
  }
  .info-name {
    color: #333333;
    font-size: 0.16rem;
    font-weight: bold;
  }
  .info-phone {
    font-size: 0.14rem;
    color: #333333;
    font-weight: bold;
    margin-left: 0.15rem;
  }
  .info-text {
    font-size: 0.14rem;
    color: #666666;
    margin-top: 0.04rem;
  }
  .address-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.2rem;
  }
  .address-icon {
    width: 0.16rem;
    height: 0.19rem;
  }
  .arrow-icon {
    width: 0.24rem;
    height: 0.24rem;
  }
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 74px;
  background: linear-gradient(180deg, #00c6b8 0%, #f5f5f5 100%);
  z-index: 1;
}
.count-wrapper {
  position: relative;
  height: 64px;
  line-height: 64px;
  border-radius: 6px;
  z-index: 999;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .count-icon {
    width: 24px;
    height: 24px;
    z-index: 999;
    margin-right: 8px;
  }
  .count-time {
    display: flex;
    align-items: center;
  }
  .time {
    color: #ffae17;
    font-size: 16px !important;
    font-weight: bold;
  }
}
</style>
