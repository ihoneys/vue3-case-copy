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
import { config } from 'process';
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
  padding-right: 0.15rem;
}
.pd-l-15 {
  padding-left: 0.15rem;
}
.mt-10 {
  margin-top: 0.1rem;
}
.mb-10 {
  margin-bottom: 0.1rem;
}
</style>
