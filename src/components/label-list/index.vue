<template>
  <ul class="label-wrapper">
    <li
      :class="['label', item.checked ? 'active-color' : '']"
      v-for="item in list"
      @click="handleItem(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watchEffect, watch } from 'vue';
export default defineComponent({
  name: 'App',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const state = reactive({
      list: props.list,
    });

    watchEffect(() => {
      state.list = props.list;
    });

    const handleItem = (item) => {
      item.checked = !item.checked;
    };
    return {
      ...toRefs(state),
      handleItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.label-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: -0.1rem;
}
.label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.08rem;
  border-radius: 0.5rem;
  background-color: #f8f8f8;
  font-size: 0.14rem;
  height: 0.3rem;
  margin-left: 0.1rem;
  margin-top: 0.15rem;
  box-sizing: border-box;
  border: 1px solid transparent;
}
.active-color {
  border: 0.01rem solid #00c6b8;
  background-color: #f0fcfb;
  color: #00c6b8;
}
</style>
