<template>
  <div class="entrance-wrapper">
    <div class="header-wrapper"></div>
    <div class="content-wrapper">
      <IYEntranceList list="{configData}" />

      <ul class="layout-list">
        <li className="item-list" v-for="item in entranceData" :key="item">
          <div className="item-column">
            <img className="item-icon" :src="item.icon" alt="icon" />
            <div className="item-title">{{ item.title }}</div>
          </div>
          <div className="item-column">
            <div className="item-icon"></div>
            <div className="item-content">{{ item.content }}</div>
          </div>
        </li>
      </ul>
      <div class="button-wrapper">
        <div className="bottom-flex bottom-left">
          <img
            className="boottom-icon"
            src="@/assets/img/record-icon.png"
            alt=""
          />
          <div>申请记录</div>
        </div>
        <div className="bottom-flex bottom-right">
          <img
            className="boottom-icon"
            src="@/assets/img/apply-icon.png"
            alt=""
          />
          <div>立即申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { entranceData } from "@/common/local-data";

export default defineComponent({
  name: 'App',
  setup() {
    return {
      entranceData
    }
  }
});

</script>
<style lang="scss" scoped>
.header-wrapper {
  height: 1.69rem;
  background-image: url('../assets/img/enter-header.png');
  background-size: 100% 100%;
}
.content-wrapper {
  padding: 0.3rem 0.15rem;
}
.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.14rem;
  color: #ffffff;
  font-weight: bold;
  .boottom-icon {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.06rem;
  }
  .bottom-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.68rem;
    height: 0.7rem;
    border-radius: 0.04rem;
  }
  .bottom-left {
    background: linear-gradient(270deg, #679df5 0%, #2e5bdd 100%);
  }
  .bottom-right {
    background: linear-gradient(90deg, #00ada1 0%, #00cb9e 100%);
  }
}
.layout-list {
  width: 100%;
  box-sizing: border-box;
  .item-list {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.3rem;
    .item-column {
      display: flex;
      align-items: center;
      .item-title {
        font-weight: bold;
        margin-left: 0.1rem;
      }
      .item-content {
        margin-top: 0.09rem;
        margin-left: 0.1rem;
        font-size: 0.14rem;
        color: #666;
      }
      .item-icon {
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }
}
</style>