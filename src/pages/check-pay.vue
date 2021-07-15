<template>
  <div class="check-pay"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, provide, ref } from 'vue';
import { Dialog, Toast } from 'vant';

import { getUrlParams, createDialog } from '@/utils/utils';
import { checkPayOrder } from '@/service/api';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const { applyId } = getUrlParams();

    onMounted(() => {
      checkPayMethod();
    });

    const checkPayMethod = async () => {
      try {
        const { returnCode } = await checkPayOrder(applyId);
        const isSuccessText = returnCode === 0 ? '支付成功！' : '支付失败！';
        createDialog(isSuccessText, () => {
          router.push('/record');
        });
      } catch (error) {
        createDialog('支付查询确认失败！', () => {
          router.push('/record');
        });
      }
    };
  },
});
</script>

<style lang="scss" scoped>
.check-pay {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
