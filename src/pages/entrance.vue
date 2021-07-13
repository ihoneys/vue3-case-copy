<template>
  <div class="entrance-wrapper">
    <div class="header-wrapper"></div>
    <div class="content-wrapper">
      <ul class="layout-list">
        <li class="item-list" v-for="item in listData" :key="item">
          <div class="item-column">
            <img class="item-icon" :src="item.icon" alt="icon" />
            <div class="item-title">{{ item.title }}</div>
          </div>
          <div class="item-column">
            <div class="item-icon"></div>
            <div class="item-content" v-html="item.content" />
          </div>
        </li>
      </ul>
      <div class="button-wrapper">
        <router-link to="/record" class="bottom-flex bottom-left">
          <img class="boottom-icon" src="@/assets/img/record-icon.png" alt="" />
          <div>申请记录</div>
        </router-link>
        <router-link to="/notice" class="bottom-flex bottom-right">
          <img class="boottom-icon" src="@/assets/img/apply-icon.png" alt="" />
          <div>立即申请</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { entranceData } from '@/common/local-data';
import { getHomeUnitConfig } from '@/service/api';

import { isObjEmpty } from '@/utils/utils';
import { getUrlParams, aseDecrypt } from '../utils/utils';

export default defineComponent({
  name: 'Home',
  setup() {
    const { commit } = useStore();
    const router = useRouter();
    const listData = ref(entranceData);
    onMounted(async () => {
      // const { data } = await getHomeUnitConfig(11);
      // if (!isObjEmpty(data)) {
      //   listData.value[0].content = data['suitablePeople'];
      //   listData.value[1].content = data['obtainMode'];
      //   listData.value[2].content = data['contactMode'];
      // }
    });

    const query = getUrlParams();

    if (!isObjEmpty(query)) {
      let userInfo = aseDecrypt(query.userInfo);
      userInfo = JSON.parse(userInfo)
      let obj = {};
      for (const key in userInfo) {
        obj[key] = userInfo[key];
      }
      commit('changeRequestParams', obj);
    }

    const handleDefault = () => {
      router.push('/notice');
    };

    return {
      listData,
      handleDefault,
    };
  },
});
</script>
<style lang="scss" scoped>
.header-wrapper {
  height: 1.69rem;
  width: 375px;
  background-image: url('../assets/img/enter-header.png');
  background-size: 100% 100%;
}
.content-wrapper {
  padding: 0.3rem 0.15rem;
  box-sizing: border-box;
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
    color: #ffffff;
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