<template>
  <div class="order-steps">
    <div class="order-steps-flex">
      <div class="steps-item" v-for="(item, i) in orderSteps">
        <img
          className="image-icon"
          :src="currentIndex >= i ? item.fillIcon : item.icon"
          alt=""
        />
        <div
          :style="{ color: currentIndex >= i ? item.fillColor : item.color }"
          :class="['currentIndex', currentIndex >= i ? 'active-color' : '']"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="reason-flex" v-if="!isPass">
      <i class="reason-icon"></i>
      <span class="error-reason">
        {{ failReason }}
      </span>
    </div>

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
import steps0_icon from '@/assets/img/steps0.png';
import steps0_iconFill from '@/assets/img/steps0-fill.png';

import steps1_icon from '@/assets/img/steps1.png';
import steps1_iconFill from '@/assets/img/steps1-fill.png';

import steps2_icon from '@/assets/img/steps2.png';
import steps2_iconFill from '@/assets/img/steps2-fill.png';
import steps2_err from '@/assets/img/steps2-err.png';

import steps3_icon from '@/assets/img/steps3.png';
import steps3_iconFill from '@/assets/img/steps3-fill.png';

import steps4_icon from '@/assets/img/steps4.png';
import steps4_iconFill from '@/assets/img/steps4-fill.png';

const orderSteps = [
  {
    title: '待审核',
    icon: steps0_icon,
    fillIcon: steps0_iconFill,
    color: '#666',
    fillColor: '#00c6b8',
  },
  {
    title: '审核中',
    icon: steps1_icon,
    fillIcon: steps1_iconFill,
    color: '#666',
    fillColor: '#00c6b8',
  },
  {
    title: '审核通过',
    icon: steps2_icon,
    fillIcon: steps2_iconFill,
    color: '#666',
    fillColor: '#00c6b8',
  },
  {
    title: '自提/收货',
    icon: steps3_icon,
    fillIcon: steps3_iconFill,
    color: '#666',
    fillColor: '#00c6b8',
  },
  {
    title: '已完成',
    icon: steps4_icon,
    fillIcon: steps4_iconFill,
    color: '#666',
    fillColor: '#00c6b8',
  },
];
import { defineComponent, reactive, toRefs, watchEffect, computed } from 'vue';

export default defineComponent({
  name: 'App',
  props: {
    currentIndex: {
      type: Number,
      default: () => 0,
    },
    isPass: {
      type: Boolean,
      default: () => false,
    },
    failReason: {
      type: String,
      default: () => '',
    },
    statusCode: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props) {
    const state = reactive({
      percent: 0,
      failReason: props.failReason,
      currentIndex: props.currentIndex,
      statusCode: props.statusCode,
      orderSteps,
    });

    watchEffect(() => {
      state.currentIndex = props.currentIndex;
      state.failReason = props.failReason;
      state.statusCode = props.statusCode
    });

    if (state.statusCode === 6 || state.statusCode === 7) {
      orderSteps[2].title = '审核失败';
      orderSteps[2].fillIcon = steps2_err;
      orderSteps[2].fillColor = "#FA5151";
    }

    const percent = computed(() => {
      if (state.currentIndex === 3) {
        return 70;
      } else {
        if (state.currentIndex === 4) {
          return 100;
        } else {
          return state.currentIndex * 25;
        }
      }
    });

    return {
      ...toRefs(state),
      percent,
    };
  },
});
</script>

<style lang="scss" scoped>
.steps-progress {
  position: absolute !important;
  top: 0.34rem;
  left: 50%;
  height: 0.04rem;
  width: 87%;
  transform: translateX(-50%);
  background-color: #f5f5f5 !important;
  z-index: 19;
}
.order-steps {
  background-color: #ffffff;
  border-radius: 0.06rem;
  /* padding: .2rem .14rem; */
  padding: 0.2rem 0;
  font-size: 0.12rem;
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
    width: 25%;
  }
  .image-icon {
    width: 0.3rem;
    height: 0.3rem;
    display: block;
    margin-bottom: 0.08rem;
    z-index: 8888;
  }
  .active-color {
    color: #00c6b8;
    font-weight: bold;
  }
  .error-reason {
    padding: 0.07rem 0.1rem;
    background: #f5f5f5;
    border-radius: 0.04rem;
    color: #fa5151;
  }
  .reason-icon {
    width: 0;
    height: 0;
    border-width: 0 0.08rem 0.08rem;
    border-style: solid;
    border-color: transparent transparent #f5f5f5;
  }
  .reason-flex {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}
</style>
