<template>
  <div class="record-wrapper">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="record-column" v-for="(item, i) in list" :key="i">
        <ul class="column-list" @click="handleItem(item)">
          <li>
            <div>申请人：{{ item.name }}</div>
            <div :style="{ color: statusObj[item.orderStatus].color }">
              {{ statusObj[item.orderStatus].name }}
            </div>
          </li>
          <li>患者姓名：{{ item.patientName }}</li>
          <li>提交日期：{{ item.date }}</li>
          <li>就诊时间：2021-04-20至2021</li>
        </ul>
        <div class="button-wrapper">
          <button v-if="item.orderStatus === 2" class="button-item orange">
            支付
          </button>
          <button v-else-if="item.orderStatus === 4" class="button-item black">
            取消订单
          </button>
          <template v-else-if="item.orderStatus === 6">
            <button class="button-item black">取消订单</button>
            <button class="button-item orange">补充资料</button>
          </template>
          <button v-else-if="item.orderStatus === 8" class="button-item orange">
            查看物流
          </button>
          <button v-else-if="item.orderStatus === 9" class="button-item black">
            查看自提点
          </button>
          <button v-else-if="item.orderStatus === 10" class="button-item black">
            查看详情
          </button>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
let list: Array<any> = [];
const mockData = () => {
  return Array.from({ length: 50 }).forEach((item, index) => {
    list.push({
      name: '李米' + index,
      orderStatus: Math.floor(Math.random() * 10) + 1,
      patientName: '小米' + index,
      date: '2021-04-20 22:4',
      treatmentDate: '2021-04-20',
    });
  });
};
mockData();
import { defineComponent, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
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
  name: 'App',
  setup() {
    const router = useRouter();
    const state = reactive({
      loading: false,
      finished: false,
      list: [] as any,
    });

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push({
            name: '李米' + i,
            orderStatus: Math.floor(Math.random() * 10) + 1,
            patientName: '小米' + i,
            date: '2021-04-20 22:4',
            treatmentDate: '2021-04-20',
            id:
              (Math.floor(Math.random() * 10) + 1) *
              Math.floor(Math.random() * 10),
          });
        }

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    const handleItem = ({ id, status }) => {
      console.log(id);
      router.push({
        name: 'detail',
        query: {
          id,
          status,
        },
      });
    };
    return {
      ...toRefs(state),
      statusObj,
      onLoad,
      handleItem,
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
  border-bottom: 1px solid #f5f5f5;
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
  margin-bottom: 10px;
}
</style>
