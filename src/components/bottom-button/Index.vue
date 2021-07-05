<template>
  <div class="position-btn">
    <IsEvenShow
      isSingle="{isSingle}"
      buttonInfo="{buttonInfo}"
      onClick="{onClickLeft}"
    />
    <Button
      className="handle-btn"
      style="{content.style}"
      onClick="{onClickRight}"
    >
      {content.name}
    </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
  props: {
      
  }
});
</script>

<style lang="scss" scope>
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
}
</style>
