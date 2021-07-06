<template>
  <div>
    <HeaderSteps :steps="seteps" :currentIndex="currentIndex" />
    <div class="apply-info-content">
      <ApplyInfo />
    </div>
    <BottomButton :isSingle="false" :buttonContext="buttonContext" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex"

import HeaderSteps from "@/components/steps/Index.vue";
import ApplyInfo from "@/components/apply-info/Index.vue";
import BottomButton from "@/components/bottom-button/Index.vue"

import { defineSteps } from "@/utils/utils"

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
    const { state } = useStore()

    return {
      seteps: defineSteps(!state.writeInfo.isMyself),
      currentIndex: !state.writeInfo.isMyself ? 2 : 3,
      buttonContext
    }
  }
});
</script>
<style lang="scss" scoped>
.apply-info-content {
  padding: 15px;
}
</style>