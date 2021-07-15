<template>
  <div class="position-btn">
    <van-button
      :style="buttonContext[1].styleBtn"
      @click="handleLeft"
      class="marign-right"
      v-if="!isSingle"
      type="primary"
      round
      plain
      block
      >{{ buttonContext[1].text }}</van-button
    >
    <van-button
      :style="buttonContext[0].styleBtn"
      @click="handleDefault"
      native-type="submit"
      round
      plain
      type="primary"
      block
      >{{ buttonContext[0].text }}</van-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect } from 'vue';

import { debounce } from '@/utils/utils';

export default defineComponent({
  name: 'BottomButton',
  props: {
    buttonContext: {
      type: Array,
      default: () => [
        {
          text: '下一步',
          styleBtn: {},
        },
        {
          text: '下一步',
          styleBtn: {},
        },
      ],
    },
    isSingle: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props, { emit }) {
    const state = reactive({
      buttonContext: props.buttonContext,
      isSingle: props.isSingle,
    });
    const handleDefault = debounce(
      () => {
        emit('handleDefault');
      },
      200,
      true
    );
    watchEffect(() => {
      state.buttonContext = props.buttonContext;
      state.isSingle = props.isSingle;
    });
    const handleLeft = debounce(
      () => {
        emit('handleLeft');
      },
      200,
      true
    );
    return {
      ...toRefs(state),
      handleDefault,
      handleLeft,
    };
  },
});
</script>

<style lang="scss" scoped>
.position-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.11rem 0.15rem;
  background-color: #fff;
  z-index: 10;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .handle-btn {
    box-shadow: 0rem 0.04rem 0.06rem 0rem rgba(0, 155, 143, 0.17);
    height: 0.44rem;
    border-radius: 0.5rem;
    line-height: 0.44rem;
    font-size: 0.16rem;
  }
  .marign-right {
    margin-right: .1rem;
  }
}
</style>
