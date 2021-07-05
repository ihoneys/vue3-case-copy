<template>
  <div class="detail-wrapper">
    detail
    <div class="background"></div>
    <OrderSteps :currentIndex="currentIndex" />
    <div class="apply-info-box">
      <ApplyContent />
    </div>
    <div class="apply-info-box">
      <div class="headerline">领取信息</div>
      <div class="address-info">
        <img class="address-icon" src="@/assets/img/address-icon.png" alt="address" />
        <div class="info">
          <div>
            <span class="info-name">毛拉啊啊</span>
            <span class="info-phone">15000561564</span>
          </div>
          <p class="info-text">广东省深圳市南山区贝培大道锡山家园274</p>
        </div>
        <img class="arrow-icon" src="@/assets/img/next.png" alt="next" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OrderSteps from "@/components/steps-order/Index.vue";
import ApplyContent from "@/components/apply-info/Index.vue";
export default defineComponent({
  name: "detail",
  components: {
    OrderSteps,
    ApplyContent,
  },
  setup() {
    return {
      currentIndex: 1,
    };
  },
});
</script>

<style lang="scss" scope>
.detail-wrapper {
  min-height: 100vh;
  padding: 0.1rem 0.12rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
  .apply-info-box {
    padding: 0.2rem 0.15rem;
    border-radius: 0.08rem;
    font-size: 0.15rem;
    margin-top: 0.1rem;
    background-color: #ffffff;
  }
  .info-name{
        color: #333333;
        font-size: .16rem;
        font-weight: bold;
    }
    .info-phone{
        font-size: .14rem;
        color: #333333;
        font-weight: bold;
        margin-left: .15rem;
    }
    .info-text{
        font-size: .14rem;
        color: #666666;
        margin-top: .04rem;
    }
    .address-info{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: .2rem;
    }
    .address-icon{
        width: .16rem;
        height: .19rem;
    }
    .arrow-icon{
        width: .24rem;
        height: .24rem;
    }
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 74px;
  background: linear-gradient(180deg, #00c6b8 0%, #f5f5f5 100%);
  z-index: 1;
}
</style>
