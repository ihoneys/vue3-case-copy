<template>
  <div class="without" v-if="!isShow">
    <img src="@/assets/img/no-data.png" alt="" />
    <div>暂无地址可选</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "widhtout",
  props: {
    isShow: {
      type: Boolean,
      default: () => true,
    },
  },
  setup(props) {
    return {
      isShow: props.isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.without {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #707070;
  font-size: .14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 2.4rem;
    height: 1.79rem;
  }
}
</style>
