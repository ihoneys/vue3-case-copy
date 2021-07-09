<template>
  <div class="detail-wrapper">
    <div class="background" v-if="data.applyStatus !== 3"></div>
    <div
      class="count-wrapper"
      v-if="data.applyStatus === 2 && data.applyStatus !== 3"
    >
      <img class="count-icon" src="@/assets/img/count-down.png" alt="" />
      <div class="count-time">
        <span class="time">等待支付倒计时：</span>
        <van-count-down :time="time">
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
    <template v-if="data.applyStatus !== 2 && data.applyStatus !== 3">
      <OrderSteps
        :currentIndex="currentIndex"
        :isPass="isPass"
        :statusCode="6"
        :failReason="failReason"
      />
    </template>
    <div class="apply-info-box">
      <ApplyContent :applyInfo="writeInfo" :fee="data.prepaidFees" />
    </div>
    <div class="apply-info-box" v-if="data.applyStatus !== 3">
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
        <img class="arrow-icon" src="@/assets/img/next.png" alt="next" />
      </div>
    </div>
    <template v-if="isShowBtn">
      <BottomButton :isSingle="isSingle" :buttonContext="buttonContext" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue';
import { useStore } from 'vuex';

import OrderSteps from '@/components/steps-order/Index.vue';
import ApplyContent from '@/components/apply-info/Index.vue';
import BottomButton from '@/components/bottom-button/Index.vue';

import { getApplyRecordDetail } from '@/service/api';
import { isObjEmpty } from '../utils/utils';
import { stat } from 'fs';

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
    const { getters } = useStore();
    const { getNewWriteInfo: writeInfo } = getters;
    const state = reactive({
      writeInfo: {},
      data: {
        applyStatus: 3,
      },
      currentIndex: 0,
      isShowBtn: false,
      isSingle: false,
      isPass: false,
      failReason: '审核失败',
      buttonContext,
    });
    const getDetails = async () => {
      // const { data } = await getApplyRecordDetail(5);
      // if (!isObjEmpty(data)) {
      //   const {
      //     applyType,
      //     clientName,
      //     clientIdCardNo,
      //     inHosArea,
      //     patientName,
      //     patientIdCardNo,
      //     patientHosCardNo,
      //     submitTime,
      //   } = data;
      //   state.writeInfo.isMyself = applyType;
      //   state.writeInfo.othersName = clientName;
      //   state.writeInfo.othersCardId = clientIdCardNo;
      //   state.writeInfo.hospitalName = inHosArea;
      //   state.writeInfo.patientName = patientName;
      //   state.writeInfo.patientCardId = patientIdCardNo;
      //   state.writeInfo.hosNo = patientHosCardNo;
      //   state.writeInfo.submissionDate = submitTime;
      //   state.data = data;

      // }
      changeBtnIsShow(6);
      changeIsSingleBtn(6);
      changIsPassAndFailReason(6, '审核失败');
      changeStepsCurrentIndex(6);
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
      console.log(state.currentIndex);
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
      console.log(statusArr.includes(status));

      // 如果显示单个改变按钮文字
      if (state.isSingle) {
        state.buttonContext.unshift();
        state.buttonContext[0].text = statusBtnText[status];
        state.buttonContext[0].styleBtn.background = '#fff';
        state.buttonContext[0].styleBtn.color = '#00C6B8';
        state.buttonContext[0].styleBtn.border = '1px solid #00C6B8';
      } else {
        if (status === 9) {
          state.buttonContext[0].styleBtn.background = '#00C6B8';
          state.buttonContext[0].styleBtn.border = '1px solid #00C6B8';
        }
      }
    };

    onMounted(getDetails);

    return {
      ...toRefs(state),
      time: 290000,
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
    width: 120px;
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
    justify-content: space-between;
    margin-top: 0.2rem;
  }
  .address-icon {
    width: 0.16rem;
    height: 0.19rem;
  }
  .arrow-icon {
    width: 0.24rem;
    height: 0.24rem;
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
