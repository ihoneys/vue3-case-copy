<template>
  <div class="container">
    <!-- <img class="icon-clear" src="../assets/img/close.png" alt=""> -->
    <van-icon class="icon-close" color="#333" size=".24rem" name="cross" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const clickItem = () => {};
    const isActive = ref(false);
    return {
      clickItem,
      isActive,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  margin-top: 100px;
  justify-content: center;
}
.item {
  color: #333;
  width: 108px;
  line-height: 30px;
  background: #f8f8f8;
  border-radius: 100px;
  text-align: center;
  border: 1px solid transparent;
  border-bottom: 0 none;
}
.icon-close{
  width: 20px;
  height: 20px;
  border: 12px solid transparent;
}
.active {
  /* border: 1px solid #00c6b8; */
  border: 1px solid #00c6b8;
  border-bottom: 0 none;
}

</style>
