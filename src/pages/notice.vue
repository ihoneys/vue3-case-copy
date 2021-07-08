<template>
  <div class="content-wrapper">
    <h3 className="headerline">病案复印须知</h3>
    <div v-html="content" />
    <router-link to="/write">
      <BottomButton
        :buttonContext="buttonContext"
        @handleDefault="handleNext"
      />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { getHospitalConfigNotice } from '@/service/api';

import BottomButton from '@/components/bottom-button/Index.vue';
import { useStore } from 'vuex';
import { getRequestParams } from '../store/getters';

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
    const router = useRouter();
    const { getters } = useStore();
    const { getRequestParams: requestParams } = getters;
    const { unitId } = requestParams;
    const content = ref<string>('');
    onMounted(async () => {
      const { data } = await getHospitalConfigNotice(unitId);
      content.value = data;
    });
    const handleNext = () => {
      router.push({
        name: 'write',
        query: {
          recordId: '10',
        },
      });
    };
    return {
      buttonContext,
      content,
      handleNext,
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