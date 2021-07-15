<template>
  <div class="record-wrapper">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      offset="20"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="record-column" v-for="item in computedList" :key="item.id">
        <ul
          :class="[
            'column-list',
            isShowBtn(item.applyStatus) ? '' : 'item-radius',
          ]"
          @click="handleItem(item)"
        >
          <li>
            <div>申请人：{{ item.applicant }}</div>
            <div :style="{ color: statusObj[item.applyStatus].color }">
              {{ statusObj[item.applyStatus].name }}
            </div>
          </li>
          <li>患者姓名：{{ item.patientName }}</li>
          <li>提交日期：{{ item.submitTime }}</li>
          <li>就诊时间：{{ item.inHosTime }}至{{ item.outHosTime }}</li>
          <li>预缴费用：{{ item.prepaidFees }}元</li>
        </ul>
        <div class="button-wrapper" v-if="isShowBtn(item.applyStatus)">
          <template v-if="item.applyStatus === 2">
            <button class="button-item orange" @click="toPayBtn(item)">
              支付
            </button>
          </template>

          <button
            v-else-if="item.applyStatus === 4"
            class="button-item black"
            @click="canleOrderBtn(item)"
          >
            取消订单
          </button>
          <template v-else-if="item.applyStatus === 6">
            <button class="button-item black" @click="canleOrderBtn(item)">
              取消订单
            </button>
            <button class="button-item orange" @click="handleSupplement(item)">
              补充资料
            </button>
          </template>
          <button
            v-else-if="item.applyStatus === 8"
            class="button-item orange"
            @click="handleLogistics(item)"
          >
            查看物流
          </button>
          <button
            v-else-if="item.applyStatus === 9"
            class="button-item black"
            @click="handleTakeNothing(item)"
          >
            查看自提点
          </button>
          <button
            v-else-if="item.applyStatus === 10"
            class="button-item black"
            @click="handleItem(item)"
          >
            查看详情
          </button>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import {
  toPay,
  cancelApplyMethod,
  resetWriteInfo,
  checkLogistics,
} from '@/utils/commonOrder';

import { getRecordList } from '@/service/api';
import { isObjEmpty } from '../utils/utils';
const statusObj = {
  1: {
    color: '#FF9F4F',
    name: '暂存',
  },
  2: {
    color: '#FF9F4F',
    name: '待支付',
  },
  3: {
    color: '#FF9F4F',
    name: '已取消',
  },
  4: {
    color: '#FF9F4F',
    name: '待审核',
  },
  5: {
    color: '#5ACF83',
    name: '审核通过',
  },
  6: {
    color: '#FA5151',
    name: '审核失败',
  },
  7: {
    color: '#FA5151',
    name: '审核失败',
  },
  8: {
    color: '#00C6B8',
    name: '待收货',
  },
  9: {
    color: '#00C6B8',
    name: '待自提',
  },
  10: {
    color: '#00C6B8',
    name: '已收货',
  },
};
export default defineComponent({
  name: 'record',
  setup() {
    const { commit, getters } = useStore();
    const { getRequestParams: requestParams } = getters;
    const { unitId, openId, userId } = requestParams;
    const router = useRouter();
    const state = reactive({
      loading: false,
      finished: false,
      list: [] as any,
    });
    const params = {
      currentPage: 0,
      openId: 33,
      pageSize: 10,
      unitId: 11,
      userId: 22,
    };

    // 加载数据
    const onLoad = async () => {
      params.currentPage++;
      const res = await getRecordList(params);
      if (!isObjEmpty(res.data)) {
        state.list = [...state.list, ...res.data.data];
        state.loading = false;
        if (state.list.length >= res.data.total) {
          state.finished = true;
        }
      } else {
        state.finished = true;
      }
    };

    // 缓存订单数据列表
    const computedList = computed(() => {
      return state.list;
    });

    // 是否有按钮显示
    const isShowBtn = computed(() => {
      return (status) => {
        return (
          status === 2 ||
          status === 4 ||
          status === 6 ||
          status === 8 ||
          status === 9 ||
          status === 10
        );
      };
    });

    // 查看详情
    const handleItem = ({ id }) => {
      router.push({
        name: 'detail',
        query: {
          id,
        },
      });
    };

    // 去支付
    const toPayBtn = ({ id, prepaidFees }) => {
      toPay({ unitId, openId, userId, applyId: id, payAmount: prepaidFees });
    };

    // 取消订单
    const canleOrderBtn = ({ id }) => {
      const updateStatus = () => {
        const index = state.list.findIndex((item) => item.id === id);
        state.list[index].applyStatus = 3;
      };

      canleApplyMethod(id, updateStatus);
    };

    // 补充资料
    const handleSupplement = ({ id, applyStatus }) => {
      resetWriteInfo(router, commit, id, applyStatus);
    };

    // 查看物流
    const handleLogistics = ({ expressNo }) => {
      checkLogistics(expressNo);
    };

    // 查看自提点
    const handleTakeNothing = ({ id }) => {
      console.log('查看自提地点');
      router.push({
        name: 'takeAddress',
        query: {
          applyId: id,
        },
      });
    };

    return {
      ...toRefs(state),
      statusObj,
      isShowBtn,
      computedList,
      onLoad,
      handleItem,
      toPayBtn,
      canleOrderBtn,
      handleSupplement,
      handleLogistics,
      handleTakeNothing,
    };
  },
});
</script>

<style lang="scss" scoped>
.record-wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 0.15rem 0.12rem;
  box-sizing: border-box;
}
.column-list {
  padding: 0.2rem 0.15rem;
  font-size: 0.14rem;
  border-top-left-radius: 0.06rem;
  border-top-right-radius: 0.06rem;
  border-bottom: .01rem solid #f5f5f5;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.08rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.item-radius {
  border-bottom-left-radius: 0.06rem;
  border-bottom-right-radius: 0.06rem;
}
.button-wrapper {
  text-align: right;
  padding: 0.08rem 0.15rem;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
}
.button-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.76rem;
  height: 0.3rem;
  border-radius: 0.5rem;
  font-size: 0.12rem;
  background-color: #fff;
  margin-left: 0.06rem;
}
.orange {
  border: 0.01rem solid #ff9f4f;
  color: #ff9f4f;
}
.black {
  border: 0.01rem solid #bebebe;
  color: #333333;
}
.green {
  border: 0.01rem solid #00c6b8;
  color: #00c6b8;
}
.record-column {
  border-bottom: 0.01rem solid #f5f5f5;
  margin-bottom: .1rem;
}
</style>
