<template>
  <div class="radio-wrapper">
    <img className="radio" :src="isSelectComputed" alt="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
export default defineComponent({
  name: "App",
  props: {
    isSelected: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props) {
    const { isSelected } = props;
    const isSelectComputed = computed(() => {
      if (isSelected) {
        return "@/assets/img/oval-icon.png";
      } else {
        return "@/assets/img/fill-oval.png";
      }
    });
    return {
      isSelectComputed,
    };
  },
});
</script>

<style lang="scss" scope>
.radio {
  width: 20px;
  height: 20px;
  display: block;
  margin-right: 6px;
}
</style>
