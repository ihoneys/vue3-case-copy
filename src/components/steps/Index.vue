<template>
  <div class="steps-wrapper">
    <div class="steps-list" v-for="(s, i) in stepsRef" :key="i">
      <div
        class="current-index"
        :class="currentIndex === i || currentIndex >= i ? 'active' : ''"
      >
        {{ i + 1 }}
      </div>
      <div class="steps-title">{{ s.title }}</div>
    </div>
    <div class="steps-progress" :style="styleWith">
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
import {
  defineComponent,
  ref,
  toRefs,
  watchEffect,
  reactive,
  computed,
} from 'vue';
const stepsMock = [
  {
    title: '填写信息',
  },
  {
    title: '领取方式',
  },
  {
    title: '预缴费用',
  },
];
export default defineComponent({
  name: 'HeaderSteps',
  props: {
    currentIndex: {
      type: Number,
      default: () => 0,
    },
    steps: {
      type: Array,
      default: () => stepsMock,
    },
    styleWith: {
      type: Object,
      default: () => ({
        width: '66%',
      }),
    },
  },
  setup(props) {
    const { currentIndex, styleWith } = props;
    const state = reactive({
      stepsRef: props.steps,
    });
    watchEffect(() => {
      state.stepsRef = props.steps;
    });

    const percent = computed(() => {
      const len = state.stepsRef.length; // 步骤的数量
      const muchNums = (len - 1) * 2; // 分成的份数
      const bPercent = 9; // 小球占的比例
      const currentMuchNums = 2 * currentIndex + 1; // 当前所占的份数
      let percent =
        ((100 - (len - 2 - currentIndex) * bPercent) / muchNums) *
        currentMuchNums;
      if (currentIndex === len - 1) {
        percent = 100;
      }
      return percent;
    });
    return {
      ...toRefs(state),
      percent,
      styleWith,
      currentIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.steps-progress {
  position: absolute !important;
  top: 0.42rem;
  left: 50%;
  height: 0.04rem;
  transform: translateX(-50%);
  background-color: #f5f5f5 !important;
  z-index: 19;
}
.steps-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  background-color: #ededed;
  padding: 0.3rem;
  .steps-list {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .current-index {
    width: 0.26rem;
    height: 0.26rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.26rem;
    margin-bottom: 0.1rem;
    z-index: 20;
    background-color: #d8d8d8;
    font-size: 0.14rem;
    color: #666666;
  }
  .active {
    color: #fff !important;
    background-color: #00c6b8 !important;
    /* background-color: black; */
  }
  .active-color {
    color: #00c6b8 !important;
  }
  .steps-title {
    color: #666666;
    font-weight: bold;
    font-size: 0.12rem;
  }
}
</style>
