<template>
  <!-- <router-view v-if="isRouterAlive" /> -->
  <!-- <router-view v-if="isRouterAlive" v-slot="{ Component }">
    <keep-alive :include="includeList">
      <component :is="Component" />
    </keep-alive>
  </router-view> -->
  <router-view />
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, ref } from "vue";
export default defineComponent({
  name: "App",
  setup() {
    // 更新缓存组件
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);
    // 需要缓存的组件
    const includeList = ref(["record"]);
    

    return {
      isRouterAlive,
      includeList,
    };
  },
});
</script>

<style lang="scss">
</style>
