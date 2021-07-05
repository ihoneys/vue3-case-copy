<template>
  <ul class="apply-wrapper">
    <li>
      <span className="headerline">申请信息</span>
    </li>
    <li>
      <span className="content-name">申请人：</span>
      <span className="content-text">毛杜拉</span>
    </li>
    <li>
      <span className="content-name">申请医院：</span>
      <span className="content-text">华中科技大学协和医院</span>
    </li>
    <li>
      <span className="content-name">申请人：</span>
      <span className="content-text">毛杜拉</span>
    </li>
    <li>
      <span className="content-name">申请人证件号：</span>
      <span className="content-text">18023882489</span>
    </li>
    <li>
      <span className="content-name">患者姓名：</span>
      <span className="content-text">袁**</span>
    </li>
    <li>
      <span className="content-name">住院号：</span>
      <span className="content-text">687889</span>
    </li>
    <li>
      <span className="content-name">提交日期：</span>
      <span className="content-text">2021-04-20 22:5</span>
    </li>
    <li>
      <span className="content-name">预交费用：</span>
      <span className="content-text line-h-20"
        >¥60（预缴费用不等于实际费用不等于实际费用）</span
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ApplyContent",
});
</script>

<style lang="scss" scope>
.apply-wrapper {
  font-size: 0.15rem;
  li {
    margin-top: 0.2rem;
    &:first-child {
      margin-top: 0rem;
    }
  }
  .headerline {
    color: #333;
    font-size: 0.18rem;
    font-weight: bold;
  }
  .content-name {
    color: #999;
  }
  .content-text {
    color: #333;
  }
}
</style>
