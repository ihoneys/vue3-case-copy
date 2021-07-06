<template>
  <div class="signture-wrapper">
    <HeaderSteps :currentIndex="1.1" :steps="defineSteps()" />
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
        <!-- <img class="sign-image" src="{imgBase64}" alt="sign" /> -->
      </div>
      <div class="signature-column">
        <span class="column-width">时间：</span>
        <span>2021年10月10日</span>
      </div>
      <button class="entrusted">被委托人签名</button>
    </div>
    <div v-show="signShow" class="mask-wrapper">
      <div class="content-wrapper">
        <div class="close-sign"></div>
        <div class="title">被委托人签名</div>
        <div class="sign-area">
          <!-- <SignatureCanvas backgroundColor="#fff" penColor="#000" canvasProps={{
              class: "write-name-canvas",
          }}
          ref={signCanvas} /> -->
          签名区域
        </div>
        <div class="confirm-btn">
          <button class="confirm reset">重置</button>
          <button class="confirm">确认</button>
        </div>
      </div>
    </div>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

import BottomButton from "@/components/bottom-button/Index.vue";
import HeaderSteps from "@/components/steps/Index.vue";

import { defineSteps } from "../utils/utils";

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
  name: "signture",
  components: {
    HeaderSteps,
    BottomButton,
  },
  setup() {
    const router = useRouter()

    const handleNext = () => {
      router.push("/copy");
    };

    const handlePrev = () => {
      router.push("/write");
    };
    return {
      signShow: false,
      defineSteps,
      buttonContext,
      handleNext,
      handlePrev
    };
  },
});
</script>

<style lang="scss" scoped>
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
.mask-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
}
.content-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  z-index: 200;
  width: 100%;
  .title {
    font-size: 0.24rem;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 0.2rem;
  }
  .sign-area {
    box-sizing: border-box;
    width: 100%;
    height: 1.42rem;
    border: 0.02rem dashed #00c6b8;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.18rem;
    color: #999;
    padding: 0.1rem;
  }
  .confirm {
    width: 1.67rem;
    height: 0.44rem;
    background: #ffffff;
    border-radius: 0.24rem;
    color: #00c6b8;
    font-size: 0.16rem;
  }
  .confirm-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem 0.1rem;
  }
  .reset {
    color: #333;
  }
  .write-name-canvas {
    width: 3.75rem;
    height: 1.2rem;
  }
  .am-icon {
    color: #ffffff;
    width: 0.3rem;
    height: 0.3rem;
  }
  .close-sign {
    position: absolute;
    right: 0.1rem;
    top: -0.5rem;
  }
}
</style>
