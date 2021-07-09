<template>
  <div>
    <HeaderSteps :steps="seteps" :currentIndex="currentIndex" />
    <div class="apply-info-content">
      <ApplyInfo :applyInfo="writeInfo" :fee="fee" />
    </div>
    <BottomButton
      :isSingle="false"
      @handleLeft="handleCanle"
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
import { cancelApply, getPrepaidFee } from "@/service/api"
import { Toast } from 'vant';

const buttonContext = [{
  text: "立即支付", styleBtn: {
    background: '#FFAE17',
    color: '#fff',
    border: '1px solid #FFAE17'
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
    const { getApplyRecordId: recordId, getNewWriteInfo: writeInfo, getRequestParams: requestParams } = getters
    console.log(writeInfo, 'writeInfo')

    const fee = ref(null)

    onMounted(async () => {
      const { unitId } = requestParams
      const { data } = await getPrepaidFee(unitId)
      fee.value = data ? data : 0
    })

    const handleCanle = async () => {
      const { returnCode } = await cancelApply({ id: recordId })
      if (returnCode === 0) {
        Toast.success({
          message: "取消成功！",
          type: "success",
          onClose() {
            router.push("/record")
          }
        })
      }
    }
    return {
      seteps: defineSteps(!state.writeInfo.isMyself),
      currentIndex: !state.writeInfo.isMyself ? 2 : 3,
      buttonContext,
      handleCanle,
      writeInfo,
      fee
    }
  }
});
</script>
<style lang="scss" scoped>
.apply-info-content {
  padding: 15px;
}
</style>