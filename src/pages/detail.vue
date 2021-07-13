<template>
  <div class="detail-wrapper">
    <div class="background" v-if="computedBgc"></div>
    <div class="count-wrapper" v-show="computedCountShow">
      <img class="count-icon" src="@/assets/img/count-down.png" alt="" />
      <!-- <div v-if="showOverTime">申请超时未支付，已取消！</div> -->
      <div class="count-time">
        <span class="time">等待支付倒计时：</span>
        <van-count-down :time="time" @finish="finishCountTime">
          <template #default="timeData">
            <span class="time" v-if="timeData.hours">{{ timeData.hours }}</span>
            <span class="time" v-if="timeData.hours">:</span>
            <span class="time">{{ timeData.minutes }}</span>
            <span class="time">:</span>
            <span class="time">{{ timeData.seconds }}</span>
          </template>
        </van-count-down>
      </div>
    </div>
    <template v-if="computedHeaderSteps">
      <OrderSteps
        :currentIndex="currentIndex"
        :isPass="isPass"
        :statusCode="data.applyStatus"
        :failReason="failReason"
      />
    </template>
    <div class="apply-info-box">
      <ApplyContent :applyInfo="writeInfo" :fee="data.prepaidFees" />
    </div>
    <div class="apply-info-box">
      <h3 class="headerline">
        {{ data.collectionMethod ? '领取信息' : '自提地址' }}
      </h3>
      <div class="address-info">
        <img
          class="address-icon"
          src="@/assets/img/address-icon.png"
          alt="address"
        />
        <div class="info" v-if="data.collectionMethod">
          <div class="flex-column">
            <span class="info-name">{{ data.consigneeName }}</span>
            <span class="info-phone">{{ data.phone }}</span>
          </div>
          <p class="info-text">{{ data.address }}{{ data.addressDetail }}</p>
        </div>
        <div v-else>{{ data.pickUpAddress }}</div>
      </div>
    </div>
    <template v-if="computedShowBottomBtn(data.applyStatus)">
      <BottomButton
        :isSingle="isSingle"
        @handleLeft="handleLeftBtn"
        @handleDefault="handleDefaultBtn"
        :buttonContext="buttonContext"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import OrderSteps from '@/components/steps-order/Index.vue';
import ApplyContent from '@/components/apply-info/Index.vue';
import BottomButton from '@/components/bottom-button/Index.vue';

import { getApplyRecordDetail, cancelApply } from '@/service/api';
import { isObjEmpty } from '../utils/utils';
import {
  toPay,
  canleApplyMethod,
  resetWriteInfo,
  checkLogistics,
} from '@/utils/commonOrder';
const buttonContext = [
  {
    text: '去支付',
    styleBtn: {
      background: '#FFAE17',
      border: '1px solid #FFAE17',
      color: '#fff',
    },
  },
  { text: '取消申请', styleWidth: {} },
];

export default defineComponent({
  name: 'detail',
  components: {
    OrderSteps,
    ApplyContent,
    BottomButton,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { getters, commit } = useStore();
    const { getNewWriteInfo: writeInfo } = getters;
    const state = reactive({
      writeInfo: {},
      data: {
        applyStatus: 0,
      },
      currentIndex: 0,
      isShowBtn: false,
      isSingle: false,
      isPass: false,
      failReason: '审核失败',
      buttonContext,
      time: 0,
      showOverTime: false,
    });
    const getDetails = async () => {
      const { id } = route.query;
      const { data } = await getApplyRecordDetail(id);
      if (!isObjEmpty(data)) {
        const {
          applyType,
          clientName,
          clientIdCardNo,
          inHosArea,
          patientName,
          patientIdCardNo,
          patientHosCardNo,
          submitTime,
          applyStatus,
        } = data;
        state.writeInfo.isMyself = applyType;
        state.writeInfo.othersName = clientName;
        state.writeInfo.othersCardId = clientIdCardNo;
        state.writeInfo.hospitalName = inHosArea;
        state.writeInfo.patientName = patientName;
        state.writeInfo.patientCardId = patientIdCardNo;
        state.writeInfo.hosNo = patientHosCardNo;
        state.writeInfo.submissionDate = submitTime;
        state.time = countTime(submitTime);
        state.data = data;
        // changeBtnIsShow(applyStatus);
        changeIsSingleBtn(applyStatus);
        changIsPassAndFailReason(applyStatus, '审核失败');
        changeStepsCurrentIndex(applyStatus);
      }
    };

    const countTime = (submitTime) => {
      const TIME = 1 * 60 * 60 * 1000;
      const submitTimestamp = Date.parse(submitTime.replace(/-/g, '/'));
      const curTime = new Date().getTime() - submitTimestamp;
      console.log(curTime <= TIME, '6+546465464');

      if (curTime <= TIME) {
        state.time = TIME - curTime;
      } else {
        state.time = 0;
      }
    };

    const changeStepsCurrentIndex = (status) => {
      const stepsIndex = {
        4: 1,
        5: 2,
        6: 2,
        7: 2,
        8: 3,
        9: 4,
      };
      state.currentIndex = stepsIndex[status];
    };

    const changIsPassAndFailReason = (status, failReason) => {
      const noPassStatus = [6, 7];
      state.isPass = !noPassStatus.includes(status);
      if (status === 6) {
        state.failReason = failReason;
      }
    };

    const changeBtnIsShow = (status) => {
      const statusArr = [1, 3, 7, 9];
      if (statusArr.includes(status)) {
        state.isShowBtn = false;
      } else {
        state.isShowBtn = true;
      }
    };

    const changeIsSingleBtn = (status) => {
      const statusArr = [2, 8];
      const statusBtnText = {
        4: '取消申请',
        6: '补充资料',
        5: '等待自提/收货',
      };
      // 是否显示单个
      state.isSingle = !statusArr.includes(status);
      console.log(state.isSingle, 'state.isSingle');

      // 如果显示单个改变按钮文字
      if (state.isSingle) {
        state.buttonContext[0].text = statusBtnText[status];
        state.buttonContext[0].styleBtn.background = '#fff';
        state.buttonContext[0].styleBtn.color = '#00C6B8';
        state.buttonContext[0].styleBtn.border = '1px solid #00C6B8';
      } else {
        if (status === 8) {
          state.buttonContext[0].text = '确认收件';
          state.buttonContext[0].styleBtn.background = '#00C6B8';
          state.buttonContext[0].styleBtn.border = '1px solid #00C6B8';
        }
      }
    };

    onMounted(getDetails);

    const computedBgc = computed(() => {
      return state.data.applyStatus !== 3;
    });

    const computedCountShow = computed(() => {
      return state.data.applyStatus === 2 && state.data.applyStatus !== 3;
    });

    const computedHeaderSteps = computed(() => {
      return state.data.applyStatus !== 2 && state.data.applyStatus !== 3;
    });

    const computedShowBottomBtn = computed(() => {
      return function (status) {
        const statusArr = [1, 3, 7, 9];
        return statusArr.includes(status) ? false : true;
      };
    });

    // 倒计时结束
    const finishCountTime = () => {
      console.log('倒计时结束--调用取消申请');
      // if (state.data.applyStatus === 2) {
      //   cancelApply({ id: state.data.id })
      //     .then((result) => {
      //       state.data.applyStatus = 3;
      //       state.showOverTime = true;
      //     })
      //     .catch((err) => {});
      // }
    };

    const confirmReceipt = () => {
      console.log('确认收件了');
    };

    const strategyBtnLeft = {
      2: canleApplyMethod,
      8: checkLogistics,
    };

    const strategyBtnRight = {
      2: toPay,
      4: canleApplyMethod,
      6: () => resetWriteInfo(commit, router, id),
      5: () => console.log('等待自提/收货'),
      8: confirmReceipt,
    };

    const executeFunc = (executeObj = 'right') => {
      const {
        data: { applyStatus },
      } = state;
      if (executeObj === 'right') {
        if (strategyBtnRight[applyStatus]) {
          strategyBtnRight[applyStatus]();
        } else {
          console.log('状态出错！');
        }
      } else {
        if (strategyBtnLeft[applyStatus]) {
          strategyBtnLeft[applyStatus]();
        } else {
          console.log('状态出错！');
        }
      }
    };

    // 单个 或者 right
    const handleDefaultBtn = () => {
      executeFunc();
    };

    const handleLeftBtn = () => {
      executeFunc('left');
    };

    return {
      ...toRefs(state),
      handleDefaultBtn,
      handleLeftBtn,
      finishCountTime,
      computedBgc,
      computedHeaderSteps,
      computedCountShow,
      computedShowBottomBtn,
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
  .info-name {
    color: #333333;
    font-size: 0.16rem;
    font-weight: bold;
    display: inline-block;
    max-width: 120px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info-phone {
    font-size: 0.14rem;
    color: #333333;
    font-weight: bold;
    margin-left: 0.15rem;
  }
  .info-text {
    font-size: 0.14rem;
    color: #666666;
    margin-top: 0.04rem;
  }
  .address-info {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
  }
  .address-icon {
    width: 0.16rem;
    height: 0.19rem;
    margin-right: 10px;
  }
  .flex-column {
    display: flex;
    align-items: center;
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
.count-wrapper {
  position: relative;
  height: 64px;
  line-height: 64px;
  border-radius: 6px;
  z-index: 999;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .count-icon {
    width: 24px;
    height: 24px;
    z-index: 999;
    margin-right: 8px;
  }
  .count-time {
    display: flex;
    align-items: center;
  }
  .time {
    color: #ffae17;
    font-size: 16px !important;
    font-weight: bold;
  }
}
</style>
