<template>
  <div class="copy-label-wrapper">
    <div class="header-title">
      <span class="title">复印用途</span>
      <span class="describe">（可多选）</span>
    </div>
    <ul class="label-wrapper">
      <li class="label" v-for="item in copyContent">{{ item.name }}</li>
    </ul>
    <div class="header-title">
      <span class="title">复印内容</span>
      <span class="describe">（可多选）</span>
    </div>
    <ul class="label-wrapper">
      <li class="label" v-for="item in copyPurpose">{{ item.name }}</li>
    </ul>
    <div class="print-wrapper">
      <div>打印份数</div>
      <div class="count-wrapper">
        <div class="count">-</div>
        <div class="numbers">1</div>
        <div class="count">+</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'App',
  setup() {
    const copyContent = ref([{ name: "其他", checked: false }, { name: "其他", checked: false }, { name: "其他", checked: false }])
    const copyPurpose = ref([{ name: "其他", checked: false }, { name: "其他", checked: false }, { name: "其他", checked: false }])
    return {
      copyContent,
      copyPurpose
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
  .label {
    width: 1.08rem;
    text-align: center;
    border-radius: 0.5rem;
    background-color: #f8f8f8;
    font-size: 0.14rem;
    height: 0.3rem;
    line-height: 0.3rem;
    margin-left: 0.1rem;
    margin-top: 0.15rem;
  }
  .label-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -0.1rem;
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
}
</style>