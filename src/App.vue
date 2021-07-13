<template>
  <!-- <router-view v-if="isRouterAlive" /> -->
  <router-view v-if="isRouterAlive" v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide('reload', reload);
    const includeList = ref(['record']);
    return {
      isRouterAlive,
      includeList,
    };
  },
});
</script>

<style lang="scss">
.pd-r-15 {
  padding-right: 15px;
}
.pd-l-15 {
  padding-left: 15px;
}
.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
</style>
