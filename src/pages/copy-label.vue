<template>
  <div class="copy-label-wrapper">
    <div class="header-title">
      <span class="title">复印用途</span>
      <span class="describe">（可多选）</span>
    </div>
    <LabelList :list="copyContent" />
    <div class="location-wrapper">
      <div>保险所在地</div>
      <div class="selected" @click="show = true">
        <span>{{ insuranceLocation ? insuranceLocation : "请选择" }}</span>
        <img class="next-icon" src="@/assets/img/next.png" alt="" />
      </div>
    </div>
    <div class="header-title">
      <span class="title">复印内容</span>
      <span class="describe">（可多选）</span>
    </div>
    <LabelList :list="copyPurpose" />
    <div class="print-wrapper">
      <div>打印份数</div>
      <div class="count-wrapper">
        <div class="count">-</div>
        <div class="numbers">1</div>
        <div class="count">+</div>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="选择省市"
        :columns="columns"
        @confirm="confirm"
        @cancel="show = !show"
      />
    </van-popup>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import BottomButton from "@/components/bottom-button/Index.vue";
import LabelList from "@/components/label-list/Index.vue";

const copyContent = ref([{ name: "其他", checked: false }, { name: "其他", checked: false }, { name: "其他", checked: false }])
const copyPurpose = ref([{ name: "其他", checked: false }, { name: "其他", checked: false }, { name: "其他", checked: false }])

const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'];

const buttonContext = [
  {
    text: "下一步",
    styleBtn: {
      background: "linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)",
      boxShadow: "0px 4px 6px 0px rgba(0,155,143,0.17)",
      color: "#fff",
    },
  },
  { text: "上一步", styleWidth: {} },
];

export default defineComponent({
  name: 'App',
  components: {
    BottomButton,
    LabelList
  },
  setup() {
    const router = useRouter()
    const { getters } = useStore()
    const { getIsMyself: isMyself, getCopyPageData: copyPageData } = getters

    const state = reactive({
      show: false,
      insuranceLocation: copyPageData.insuranceLocation
    })
    const confirm = (val) => {
      state.insuranceLocation = val
      state.show = false
    }

    const handleNext = () => {
      router.push("/mailing")
    };

    const handlePrev = () => {
      const callbackPath = isMyself === 0 ? "/write" : "/signture"
      router.push(callbackPath)
    }
    return {
      ...toRefs(state),
      copyContent,
      copyPurpose,
      columns,
      confirm,
      buttonContext,
      handleNext,
      handlePrev
    }
  }
});
</script>
<style lang="scss" scoped>
.copy-label-wrapper {
  padding: 0.22rem 0.15rem;
  .title {
    font-weight: bold;
  }
  .describe {
    font-size: 0.12rem;
    color: #666666;
  }
  .print-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .count-wrapper {
      display: flex;
      align-items: center;
    }
    .count {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      text-align: center;
      line-height: 20px;
      border: 1.5px solid #666;
      color: #666;
      font-weight: bold;
    }
    .numbers {
      width: 40px;
      text-align: center;
    }
  }
  .next-icon {
    width: 24px;
    height: 24px;
  }
  .selected {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
  .location-wrapper {
    display: flex;
    align-items: center;
    height: 44px;
    margin: 30px 0;
    border-bottom: 1px solid #f5f5f5;
  }
}
</style>