<template>
  <div>
    <HeaderSteps :steps="steps" :currentIndex="currentIndex" />
    <div class="apply-info-content">
      <ApplyInfo :applyInfo="writeInfo" :fee="fee" />
    </div>
    <BottomButton
      :isSingle="false"
      @handleLeft="handleCanle"
      @handleDefault="handleDefault"
      :buttonContext="buttonContext"
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex"

import HeaderSteps from "@/components/steps/Index.vue";
import ApplyInfo from "@/components/apply-info/Index.vue";
import BottomButton from "@/components/bottom-button/Index.vue"

import { defineSteps } from "@/utils/utils"
import { cancelApply, getPrepaidFee, payOrder } from "@/service/api"
import { Toast } from 'vant';
import { toPay } from "@/utils/commonOrder";
import { createToast } from '../utils/utils';

const buttonContext = [{
  text: "立即支付", styleBtn: {
    background: '#FFAE17',
    color: '#fff',
    border: '.01rem solid #FFAE17'
  },
}, { text: "取消申请", styleWidth: {} }]
export default defineComponent({
  name: 'App',
  components: {
    HeaderSteps,
    ApplyInfo,
    BottomButton
  },
  setup() {
    const router = useRouter()
    const { state, getters } = useStore()
    const { getApplyRecordId: recordId, getNewWriteInfo: writeInfo, getRequestParams: requestParams, getIsResetWrite: isResetWrite } = getters

    let steps = ref(defineSteps(!state.writeInfo.isMyself))

    // 是否重填
    if (isResetWrite) {
      buttonContext[0].text = '重新提交'
      steps.value[0].title = '补充资料'
      steps.value[steps.value.length - 1].title = '重新提交';
    }

    const fee = ref(100)
    const { unitId, openId, userId } = requestParams

    // 加载支付金额
    onMounted(async () => {
      const { data } = await getPrepaidFee(unitId)
      fee.value = data ? data : 0
    })

    // 取消申请
    const handleCanle = async () => {
      cancelApplyMethod(recordId, () => {
        router.push('/record')
      })
    }

    // 点击右边支付按钮
    const handleDefault = () => {
      if (!isResetWrite) {
        const payPost = {
          payAmount: fee.value,
          applyId: recordId,
          openId,
          userId,
          unitId
        }
        toPay(payPost, () => { /**支付成功回调 */ }, () => {
          router.push('/record')
        })
      } else {
        createToast('重新提交成功', 'success', () => {
          router.push('/record')
        })
      }
    }

    return {
      steps,
      currentIndex: !state.writeInfo.isMyself ? 2 : 3,
      buttonContext,
      writeInfo,
      fee,
      handleCanle,
      handleDefault,
    }
  }
});
</script>
<style lang="scss" scoped>
.apply-info-content {
  padding: .15rem;
}
</style>