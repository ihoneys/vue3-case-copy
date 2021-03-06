<template>
  <div class="steps">
    <ul>
      <HeaderSteps :steps="steps" :currentIndex="currentIndex" />
      <li class="column-flex">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>领取方式</span>
        </div>
        <van-radio-group
          @change="watchChange"
          v-model="checked"
          direction="horizontal"
        >
          <van-radio name="1">邮寄到付</van-radio>
          <van-radio name="2">到院自取</van-radio>
        </van-radio-group>
      </li>
      <li class="column-flex" v-if="checked === '1'" @click="show = true">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>快递公司</span>
        </div>
        <!-- <div class="pd-r-15">{{ expressCompany }}</div> -->
        <div class="selected" style="padding-right: 0.08rem">
          <span>{{ expressCompany ? expressCompany : "请选择快递公司" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <li class="column-flex" v-if="checked === '1'" @click="handleAddress">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>邮寄地址</span>
        </div>
        <div class="selected" style="padding-right: 0.08rem">
          <span>{{ currentAddress ? currentAddress : "请选择地址" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <template v-if="checked === '2'">
        <div class="express-wrapper">
          <div class="column-flex-left">
            <span class="label-icon">*</span>
            <span>院内领取地址</span>
          </div>
        </div>
        <div
          class="take-address"
          v-if="takeAddress && takeAddress.pickUpAddress"
        >
          {{ takeAddress.pickUpAddress }} <br />备注： 电话：{{
            takeAddress.contactPhone
          }}
          取件时间：工作日：{{ takeAddress.pickUpTime }}
        </div>
        <div v-else class="take-address">地址获取失败</div>
      </template>
      <div class="user-tips">
        <div>温馨提醒</div>
        <p class="tips-content">
          除年龄小于1岁患者可由委托人网上预约病案复印，其他患者仅由本人网上申请，如需要委托人办理，请到窗口办理。
        </p>
      </div>
    </ul>
    <van-popup v-model:show="show" position="bottom">
      <van-picker
        title="选择快递公司"
        :columns="columns"
        @confirm="confirm"
        @cancel="show = !show"
      />
    </van-popup>
    <BottomButton
      :isSingle="false"
      :buttonContext="buttonContext"
      @handleDefault="handleNext"
      @handleLeft="handlePrev"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import HeaderSteps from "@/components/steps/Index.vue";
import BottomButton from "@/components/bottom-button/Index.vue";

import { createToast, defineSteps, isObjEmpty } from "../utils/utils";
import {
  getExpressCompany,
  saveMailingData,
  getTakeAddress,
  getCollectionMethod,
} from "@/service/api";

const buttonContext = [
  {
    text: "下一步",
    styleBtn: {
      background: "linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)",
      boxShadow: "0rem .04rem .06rem 0rem rgba(0,155,143,0.17)",
      color: "#fff",
    },
  },
  { text: "上一步", styleWidth: {} },
];

export default defineComponent({
  name: "App",
  components: {
    HeaderSteps,
    BottomButton,
  },
  setup() {
    const { getters, dispatch, commit } = useStore();
    const router = useRouter();

    const {
      getIsMyself,
      getRequestParams: requestParams,
      getMailingAddress: mailingObject,
      getApplyRecordId: recordId,
      getIsResetWrite: isResetWrite,
    } = getters;

    const { unitId } = requestParams;
    const {
      way,
      mailingAddress,
      expressCompany: expCompany,
      addressId,
    } = mailingObject;

    const checked = ref(way);
    console.log(way);
    const expressCompany = ref(expCompany);
    const columns = ref<any>([]);
    const show = ref(false);
    const takeAddress = ref<any>(null);

    let requestNums = 0;
    const watchChange = (val) => {
      checked.value = val;
      dispatch("changeIsTakeAction", val);
      if (val === "2" && requestNums === 0) {
        getTakeAddressContent();
      }
    };

    const getTakeAddressContent = async () => {
      const { data } = await getTakeAddress(unitId);
      if (!isObjEmpty(data)) {
        takeAddress.value = data;
      }
      requestNums = 1;
    };

    onMounted(async () => {
      console.log(columns.value.length,555555)
      if (!columns.value.length) {
        const { data } = await getExpressCompany(unitId);
        if (!isObjEmpty(data)) {
          for (const key in data) {
            columns.value.push(data[key]);
          }
        }
      }

      if (isResetWrite) {
        const { data } = await getCollectionMethod(recordId);
        if (!isObjEmpty(data)) {
          checked.value = data.collectionMethod ? "1" : "2";
          expressCompany.value = data.expressCompany;
        }
      }
    });

    const handleAddress = () => {
      router.push("/address");
    };

    const handleNext = () => {
      if (checked.value === "1") {
        if (!expressCompany.value) {
          createToast("请选择快递公司！", "fail");
          return false;
        }

        if (!mailingAddress) {
          createToast("请填写邮寄地址！", "fail");
          return false;
        }
      }
      nextSaveData();
      commitChangeMailingAddress();
    };

    const nextSaveData = async () => {
      const postData: any = {
        addressId,
        applyId: recordId,
        collectionMethod: checked.value === "1" ? 1 : 0,
        expressAddress: mailingAddress,
        expressCompany: expressCompany.value,
      };
      if (checked.value === "2" && !isObjEmpty(takeAddress.value)) {
        postData.pickUpAddress = `${takeAddress.value.pickUpAddress}备注：电话：${takeAddress.value.contactPhone} 取件时间：工作日：${takeAddress.value.pickUpTime}`;
      } else {
        postData.pickUpAddress = null;
      }

      const { returnCode } = await saveMailingData(postData);

      if (returnCode === 0) {
        router.push("/payOrder");
      }
    };

    const handlePrev = () => {
      commitChangeMailingAddress();
      router.go(-1);
    };

    const commitChangeMailingAddress = () => {
      commit("changeMailingAddress", {
        addressId,
        way: checked.value,
        expressCompany: expressCompany.value,
        mailingAddress,
      });
    };

    const confirm = (val) => {
      expressCompany.value = val;
      commit("changeExpressCompany", val);
      show.value = false;
    };
    return {
      steps: defineSteps(!getIsMyself),
      show,
      columns,
      checked,
      currentAddress: mailingAddress,
      watchChange,
      takeAddress,
      handleAddress,
      buttonContext,
      handleNext,
      handlePrev,
      currentIndex: !getIsMyself ? 1 : 2,
      expressCompany,
      confirm,
    };
  },
});
</script>

<style lang="scss" scoped>
.steps {
  background-color: #f5f5f5;
  min-height: 100vh;
  font-size: 0.16rem;
}
.column-flex-left {
  width: 1.2rem;
}
.column-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 0.44rem;
  border-bottom: 0.01rem solid #f5f5f5;
  padding-left: 0.15rem;
  font-size: 0.15rem;
  & :deep() .van-radio--horizontal {
    margin-right: 0;
    padding-right: 0.15rem;
  }
  .next-icon {
    width: 0.24rem;
    height: 0.24rem;
  }
  .selected {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
}
.label-icon {
  color: #f65c44;
  margin-right: 0.07rem;
}
.take-address {
  width: 85%;
  padding-left: 0.28rem;
  line-height: 0.24rem;
}
.express-wrapper {
  height: 0.44rem;
  padding-left: 0.15rem;
  line-height: 0.44rem;
}
.user-tips {
  padding: 0.15rem;
  background-color: #f5f5f5;
}
.tips-content {
  color: #666666;
  font-size: 0.12rem;
  line-height: 0.2rem;
  margin-top: 0.04rem;
  background-color: #f5f5f5;
}
</style>
