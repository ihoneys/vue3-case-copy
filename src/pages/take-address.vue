<template>
  <div class="take-address">
    <div class="take-adderss-wrapper">
      <div class="address-name">{{takeAddress}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { getPickUpAddress } from '@/service/api';
export default defineComponent({
  name: 'App',
  setup() {
    const route = useRoute();
    const takeAddress = ref('');
    onMounted(async () => {
      const { applyId } = route.query;
      const { data } = await getPickUpAddress(applyId);
      takeAddress.value = data;
    });

    return {
      takeAddress,
    };
  },
});
</script>

<style lang="scss" scoped>
.take-address {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: .1rem .12rem;
  box-sizing: border-box;
  .take-adderss-wrapper {
    background-color: #fff;
    border-radius: .06rem;
    padding: .2rem .15rem;
    line-height: .25rem;
  }
}
</style>
