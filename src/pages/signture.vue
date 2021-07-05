<template>
  <div class="signture-wrapper">
    <div class="content">
      <h4 class="title">病案复印授权委托书</h4>
      <ul class="content-list">
        <li>
          <span class="column-name">委托人姓名：</span>
          <span class="">213123</span>
        </li>
        <li>
          <span class="column-name">委托人身份证：</span>
          <span>4564321858050045</span>
        </li>
        <li>
          <span class="column-name">被委托人姓名：</span>
          <span>侯德胜</span>
        </li>
        <li>
          <span class="column-name">被委托人身份证：</span>
          <span>4564321858050045</span>
        </li>
        <li>
          <span class="column-name">委托事项：</span>
          <span class="matter"
            >因复印需要，委托我的xx关系xx姓名为我
            的代理人，前往xxx医院复印我在xx科室住院治疗的
            病例资料，委托人签署该授权委托书真实有效，如有
            不实，本人承担全部法律责任。</span
          >
        </li>
      </ul>
      <div class="signature-column">
        <span class="column-width">被委托人签名：</span>
        <!-- <img className="sign-image" src="{imgBase64}" alt="sign" /> -->
      </div>
      <div class="signature-column">
        <span class="column-width">时间：</span>
        <span>2021年10月10日</span>
      </div>
      <button class="entrusted">被委托人签名</button>
    </div>
    <!-- {!isCloseSign ?
    <HandWriteSignature
      closeSign="{closeSign}"
      getImageBase64="{getImageBase64}"
    />
    : null} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scope>
.signture-wrapper {
  background-color: #ffffff;
  .title {
    text-align: center;
  }
  .content {
    padding: 0.2rem 0.15rem;
  }
  .content-list li {
    margin-top: 0.2rem;
  }
  .column-name {
    color: #999999;
  }
  .matter {
    line-height: 0.24rem;
  }
  .signature-column {
    margin-top: 0.1rem;
    .sign-image {
      width: 1.02rem;
      height: 0.3rem;
    }
  }
  .column-width {
    display: inline-block;
    width: 65%;
    text-align: right;
    color: #999999;
  }
  .entrusted {
    background-color: #ffffff;
    font-weight: 500;
    font-size: 0.14rem;
    border-radius: 0.04rem;
    border: 0.01rem solid #979797;
    width: 1.68rem;
    height: 0.44rem;
    text-align: center;
    line-height: 0.42rem;
    margin-top: 0.4rem;
  }
}
</style>
