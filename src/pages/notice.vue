<template>
  <div class="content-wrapper">
    <h3 className="headerline">病案复印须知</h3>
    <div>须知内容</div>
    <router-link to="/write">
      <BottomButton
        :buttonContext="buttonContext"
        @handleDefault="handleNext"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import BottomButton from '@/components/bottom-button/Index.vue';

const buttonContext = [
  {
    text: '下一步',
    styleBtn: {
      background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
      boxShadow: '0px 4px 6px 0px rgba(0,155,143,0.17)',
      color: '#fff',
    },
  },
];
export default defineComponent({
  name: 'App',
  components: {
    BottomButton,
  },
  setup() {
    const handleNext = () => {};
    return {
      buttonContext,
    };
  },
});
</script>
<style lang="scss" scoped>
.content-wrapper {
  padding: 0 0.15rem;
  background-color: #fff;
  .headerline {
    font-size: 0.18rem;
    color: #333;
    margin-top: 0.3rem;
    margin-bottom: 0.12rem;
  }
}
</style>