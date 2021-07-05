<template>
  <div class="order-steps">
    <div class="order-steps-flex">
      <div class="steps-item" v-for="(item, i) in orderSteps">
        <img
          className="image-icon"
          :src="currentIndex >= i ? item.fillIcon : item.icon"
          alt=""
        />
        <div :class="['currentIndex', currentIndex >= i ? 'active-color' : '']">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="error-reason">您的个人信息提交有误，请重新提交</div>
    <div class="steps-progress">
      <van-progress
        color="#00C6B8"
        track-color="#f5f5f5"
        :percentage="percent"
        :show-pivot="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import steps0_icon from "@/assets/img/steps0.png";
import steps0_iconFill from "@/assets/img/steps0-fill.png";

import steps1_icon from "@/assets/img/steps1.png";
import steps1_iconFill from "@/assets/img/steps1-fill.png";

import steps2_icon from "@/assets/img/steps2.png";
import steps2_iconFill from "@/assets/img/steps2-fill.png";
import steps2_err from "@/assets/img/steps2-err.png";

import steps3_icon from "@/assets/img/steps3.png";
import steps3_iconFill from "@/assets/img/steps3-fill.png";

import steps4_icon from "@/assets/img/steps4.png";
import steps4_iconFill from "@/assets/img/steps4-fill.png";

const orderSteps = [
  {
    title: "待审核",
    icon: steps0_icon,
    fillIcon: steps0_iconFill,
  },
  {
    title: "审核中",
    icon: steps1_icon,
    fillIcon: steps1_iconFill,
  },
  {
    title: "审核通过",
    icon: steps2_icon,
    fillIcon: steps2_iconFill,
    error: {
      title: "审核失败",
      errIcon: steps2_err,
    },
  },
  {
    title: "等待自提/收货",
    icon: steps3_icon,
    fillIcon: steps3_iconFill,
  },
  {
    title: "已完成",
    icon: steps4_icon,
    fillIcon: steps4_iconFill,
  },
];
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  props: {
    currentIndex: {
      type: Number,
      default: () => 0,
    },
    isPass: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const { currentIndex, isPass } = props;
    let percent;
    if (currentIndex === 3) {
      percent = 70;
    } else {
      if (currentIndex === 4) {
        percent = 100;
      } else {
        percent = currentIndex * 20;
      }
    }
    return {
      orderSteps,
      currentIndex: 1,
      percent,
    };
  },
});
</script>

<style lang="scss" scope>
.steps-progress {
  position: absolute !important;
  top: 0.42rem;
  left: 50%;
  height: 4px;
  width: 87%;
  transform: translateX(-50%);
  background-color: #f5f5f5 !important;
  z-index: 19;
}
.order-steps {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 20px 14px;
  font-size: 12px;
  color: #666666;
  position: relative;
  z-index: 2;
  .order-steps-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .steps-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .image-icon {
    width: 30px;
    height: 30px;
    display: block;
    margin-bottom: 8px;
    z-index: 8888;
  }
  .active-color {
    color: #00c6b8;
    font-weight: bold;
  }
  .error-reason {
    padding: 7px 10px;
    background: #f5f5f5;
    border-radius: 4px;
    color: #fa5151;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    &::before {
      content: "";
      position: absolute;
      top: -8px;
      left: 134px;
      display: block;
      width: 0;
      height: 0;
      border-width: 0 8px 8px;
      border-style: solid;
      border-color: transparent transparent #f5f5f5; /*透明 透明  黄*/
    }
  }
}
</style>
