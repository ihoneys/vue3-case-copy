<template>
  <div class="detail-wrapper">
    <div class="background" v-if="computedBgc"></div>
    <div class="count-wrapper" v-if="computedCountShow">
      <img class="count-icon" src="@/assets/img/count-down.png" alt="" />
      <!-- <div v-if="showOverTime">申请超时未支付，已取消！</div> -->
      <div class="count-time">
        <span class="count-time-style">等待支付倒计时：</span>
        <van-count-down
          class="count-time-style"
          format="mm:ss"
          :time="time"
          @finish="finishCountTime"
        />
      </div>
    </div>
    <template v-if="computedHeaderSteps">
      <OrderSteps
        :currentIndex="computedStepsCurIndex"
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
        {{ data.collectionMethod ? "领取信息" : "自提地址" }}
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
import { computed, defineComponent, onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

import OrderSteps from "@/components/steps-order/Index.vue";
import ApplyContent from "@/components/apply-info/Index.vue";
import BottomButton from "@/components/bottom-button/Index.vue";

import {
  getApplyRecordDetail,
  cancelApply,
  confirmReceipt as confirmReceiptRequest,
} from "@/service/api";
import { isObjEmpty } from "../utils/utils";
import {
  toPay,
  cancelApplyMethod,
  resetWriteInfo,
  checkLogistics,
} from "@/utils/commonOrder";
import { Dialog, Toast } from "vant";
const buttonObject = [
  {
    text: "去支付",
    styleBtn: {
      background: "#FFAE17",
      border: ".01rem solid #FFAE17",
      color: "#fff",
    },
  },
  { text: "取消申请", styleWidth: {} },
];

export default defineComponent({
  name: "detail",
  components: {
    OrderSteps,
    ApplyContent,
    BottomButton,
  },
  setup() {
    const buttonContext = JSON.parse(JSON.stringify(buttonObject));

    const route = useRoute();
    const router = useRouter();
    const { getters, commit } = useStore();
    const { getRequestParams: requestParams } = getters;
    const { unitId, openId, userId } = requestParams;
    const { id } = route.query;

    const state: any = reactive({
      writeInfo: {},
      data: {
        applyStatus: 0,
      },
      currentIndex: 0,
      isShowBtn: false,
      isSingle: false,
      isPass: false,
      failReason: "审核失败",
      buttonContext,
      time: 0,
      showOverTime: false,
    });

    const getDetails = async () => {
      const { data } = await getApplyRecordDetail(id);
      if (!isObjEmpty(data)) {
        const keyMap = {
          isMyself: "applyType",
          othersName: "clientName",
          othersCardId: "clientIdCardNo",
          hospitalName: "inHosArea",
          patientName: "patientName",
          patientCardId: "patientIdCardNo",
          hosNo: "patientHosCardNo",
          submissionDate: "submitTime",
          othersPhone: "clientPhone",
          patientPhone: "patientPhone",
          outTradeNo: "outTradeNo",
        };
        for (const myKey in keyMap) {
          if (myKey === "isMyself") {
            state.writeInfo[myKey] = data[keyMap[myKey]] ? 0 : 1;
          } else {
            state.writeInfo[myKey] = data[keyMap[myKey]];
          }
        }
        state.data = data;
        countTime(data.submitTime);
        // console.log(data.applyStatus);
        changeIsSingleBtn(data.applyStatus);
        changIsPassAndFailReason(data.applyStatus, data.failAuditReason);
        changeStepsCurrentIndex(data.applyStatus);
      }
    };

    // 计算剩余支付时间
    const countTime = (submitTime) => {
      const TIME = 1 * 60 * 60 * 1000;
      const submitTimestamp = Date.parse(submitTime.replace(/-/g, "/"));
      const curTime = new Date().getTime() - submitTimestamp;
      if (curTime <= TIME) {
        state.time = TIME - curTime;
      } else {
        state.time = 0;
      }
    };

    // 当前的 步骤条 Index
    const changeStepsCurrentIndex = (status) => {
      const stepsIndex = {
        4: 1,
        5: 2,
        6: 2,
        7: 2,
        8: 3,
        9: 3,
        10: 4,
      };
      state.currentIndex = stepsIndex[status];
    };

    // 审核失败显示
    const changIsPassAndFailReason = (status, failReason) => {
      const noPassStatus = [6, 7];
      state.isPass = !noPassStatus.includes(status);
      if (noPassStatus.includes(status)) {
        state.failReason = failReason;
      }
    };

    // 是否显示单个按钮
    const changeIsSingleBtn = (status) => {
      const statusArr = [4, 5, 6]; // 默认2存在

      const onlyBtnText = {
        4: "取消申请",
        6: "补充资料",
        5: "等待自提/收货",
        9: "自提点查看",
      };

      // 是否显示单个
      state.isSingle = statusArr.includes(status); // true 为显示单个 false 显示两个

      console.log(state.isSingle, "state.isSingle");

      // 如果显示单个改变按钮文字
      if (state.isSingle) {
        state.buttonContext[0].text = onlyBtnText[status];
        state.buttonContext[0].styleBtn.border = ".01rem solid #00C6B8";
        state.buttonContext[0].styleBtn.color = "#00C6B8";
        state.buttonContext[0].styleBtn.background = "#ffffff";
      } else {
        if (status === 8 || status === 9) {
          state.buttonContext[0].text = "确认收件";
          state.buttonContext[0].styleBtn.background = "#00C6B8";
          state.buttonContext[0].styleBtn.color = "#fff";
          state.buttonContext[0].styleBtn.border = ".01rem solid #00C6B8";
          state.buttonContext[1].text =
            status === 8 ? "查看物流" : "查看自提点";
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
      const includesList = [0, 2, 3];
      return !includesList.includes(state.data.applyStatus);
    });

    const computedShowBottomBtn = computed(() => {
      return function (status) {
        const statusArr = [2, 4, 5, 6, 8, 9];
        return statusArr.includes(status);
      };
    });

    const computedStepsCurIndex = computed(() => {
      return state.currentIndex;
    });

    // 倒计时结束
    const finishCountTime = () => {
      if (state.data.applyStatus === 2) {
        cancelApply({ id: state.data.id })
          .then((result) => {
            state.data.applyStatus = 3;
            state.showOverTime = true;
          })
          .catch((err) => {});
      }
      console.log("倒计时结束");
    };

    // 确认收件
    const confirmReceipt = () => {
      Dialog.confirm({
        title: "提示",
        message: "是否确认收件？",
        confirmButtonColor: "#00C6B8",
      }).then(async () => {
        const { returnCode } = await confirmReceiptRequest(state.data.id);
        let receiptText = "确认收件失败!";
        if (returnCode === 0) {
          receiptText = "收件成功！";
          state.currentIndex = 4; // 头部进度条更新
          state.data.applyStatus = 10; // 已完成
        }
        Toast.success(receiptText);
      });
    };

    const strategyBtnLeft = {
      2: () =>
        cancelApplyMethod(state.data.id, () => {
          router.push("/record");
        }),
      8: () => checkLogistics(state.data.expressNo),
      9: () => {
        router.push({
          path: "/takeAddress",
          query: {
            applyId: id,
          },
        });
      },
    };

    const strategyBtnRight = {
      2: () =>
        toPay({
          unitId,
          openId,
          userId,
          payAmount: state.data.prepaidFees,
          applyId: id as string,
        }),
      4: () =>
        cancelApplyMethod(state.data.id, () => {
          router.push("/record");
        }),
      6: () =>
        resetWriteInfo(router, commit, id as string, state.data.applyStatus),
      5: () => console.log("等待自提/收货"),
      8: confirmReceipt,
      9: confirmReceipt,
    };

    // 按钮执行对应方法
    const executeFunc = (executeObj = "right") => {
      const {
        data: { applyStatus },
      } = state;

      if (executeObj === "right") {
        if (!strategyBtnRight[applyStatus])
          return console.log("状态出错！right");
        strategyBtnRight[applyStatus]();
      } else {
        if (!strategyBtnLeft[applyStatus]) return console.log("状态出错！left");
        strategyBtnLeft[applyStatus]();
      }
    };

    // 单个 或者 right
    const handleDefaultBtn = () => {
      executeFunc();
    };

    const handleLeftBtn = () => {
      executeFunc("left");
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
      computedStepsCurIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.detail-wrapper {
  min-height: 100vh;
  padding: 0.1rem 0.12rem;
  padding-bottom: 0.8rem;
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
    max-width: 1.2rem;
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
    margin-right: 0.1rem;
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
  height: 0.74rem;
  background: linear-gradient(180deg, #00c6b8 0%, #f5f5f5 100%);
  z-index: 1;
}
.count-wrapper {
  position: relative;
  height: 0.64rem;
  line-height: 0.64rem;
  border-radius: 0.06rem;
  z-index: 999;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .count-icon {
    width: 0.24rem;
    height: 0.24rem;
    z-index: 999;
    margin-right: 0.08rem;
  }
  .count-time {
    display: flex;
    align-items: center;
    .count-time-style {
      color: #ffae17;
      font-size: 0.16rem;
      font-weight: bold;
      letter-spacing: -0.01rem;
    }
  }
}
</style>
