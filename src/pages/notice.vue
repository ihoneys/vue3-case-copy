<template>
  <div class="content-wrapper">
    <h3 className="headerline">病案复印须知</h3>
    <div v-html="content" />
    <BottomButton :buttonContext="buttonContext" @handleDefault="handleNext" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import { getHospitalConfigNotice } from "@/service/api";

import BottomButton from "@/components/bottom-button/Index.vue";

const buttonContext = [
  {
    text: "下一步",
    styleBtn: {
      background: "linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)",
      boxShadow: "0rem .04rem .06rem 0rem rgba(0,155,143,0.17)",
      color: "#fff",
    },
  },
];
export default defineComponent({
  name: "App",
  components: {
    BottomButton,
  },
  setup() {
    const router = useRouter();
    const { getters, commit } = useStore();
    const { getRequestParams: requestParams } = getters;
    const { unitId } = requestParams;
    const content = ref<string>("");
    
    onMounted(async () => {
      const { data } = await getHospitalConfigNotice(unitId);
      content.value = data;
    });

    const handleNext = () => {
      commit("changeApplyRecordId", null); // 从新情况已有的记录 ID 避免重复
      commit("changeIsResetWrite", false); // 是否重填 制为 false
      router.push("/write");
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