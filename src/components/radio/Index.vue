<template>
  <div class="radio-wrapper" @click="handleRadio">
    <img v-if="isSelected" className="radio" src="../../assets/img/fill-oval.png" alt="" />
    <img v-else className="radio" src="../../assets/img/oval-icon.png" alt="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watchEffect, ref } from 'vue';
export default defineComponent({
  name: 'App',
  props: {
    isSelected: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { emit }) {
    const isSelected = ref(props.isSelected);
    watchEffect(() => {
      isSelected.value = props.isSelected;
    });
    const handleRadio = () => {
      emit('click');
    };
    return {
      isSelected,
    };
  },
});
</script>

<style lang="scss" scoped>
.radio {
  width: .2rem;
  height: .2rem;
  display: block;
}
</style>
