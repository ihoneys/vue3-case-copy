<template>
  <div class="copy-label-wrapper">
    <div class="header-title">
      <span class="title">复印内容</span>
      <span class="describe">（可多选）</span>
    </div>
    <LabelList :list="copyContent" />
    <div class="location-wrapper">
      <div>保险所在地</div>
      <div class="selected" @click="show = true">
        <span>{{ insuranceLocation ? insuranceLocation : '请选择' }}</span>
        <img class="next-icon" src="@/assets/img/next.png" alt="" />
      </div>
    </div>
    <div class="header-title">
      <span class="title">复印用途</span>
      <span class="describe">（可多选）</span>
    </div>
    <LabelList :list="copyPurpose" />
    <div class="print-wrapper">
      <div>打印份数</div>
      <div class="count-wrapper">
        <div
          class="count"
          :class="[count === 0 ? 'over-reduce' : '']"
          @click="reduce"
        >
          -
        </div>
        <div class="numbers">{{ count }}</div>
        <div class="count" @click="increase">+</div>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
      <van-area
        title="选择省市"
        :columns-num="2"
        :area-list="areaList"
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

<script>
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { Dialog } from "vant"

import BottomButton from "@/components/bottom-button/Index.vue";
import LabelList from "@/components/label-list/Index.vue";

import { areaList } from '@vant/area-data';
import { getCopyLabelData, saveCopyContent, getCopyPurposeContent } from "@/service/api";
import { isObjEmpty, validateFunc } from "@/utils/utils"

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
  name: 'App',
  components: {
    BottomButton,
    LabelList
  },
  setup() {
    const router = useRouter()
    const { getters, commit } = useStore()
    const { getIsMyself: isMyself, getCopyPageData: copyPageData, getRequestParams: requestParams, getApplyRecordId: applyId, getCopyDialog: copyDialog, getIsResetWrite: isResetWrite } = getters

    const { unitId } = requestParams
    const { copyContent, copyPurpose, printNums, insuranceLocation } = copyPageData

    const state = reactive({
      insuranceLocation,
      count: printNums,
      copyContent: [],
      copyPurpose: [],
      show: false,
      areaCode: ""
    })


    const initLabelData = async () => {
      console.log(21321)
      const { data } = await getCopyLabelData(unitId)
      if (!isObjEmpty(data)) {
        for (const key in data) {
          if (state[key] && data[key].split(",").length > 0) {
            state[key] = []
            data[key].split(",").forEach(item => {
              const checked = copyPageData[key].includes(item)
              state[key].push({ name: item, checked })
            })
          }
        }
        console.log("+++6666")
      }


      const findIncludes = (arr, content) => {
        let indexArr = []
        const contentArr = content.split(",")
        contentArr.forEach(key => {
          const keyIndex = arr.findIndex(item => item.name === key)
          if (keyIndex !== -1) {
            indexArr.push(keyIndex)
          }
        })
        return indexArr
      }
      if (isResetWrite) {
        const { data } = await getCopyPurposeContent(applyId)
        console.log(data)
        state.insuranceLocation = data.reimbursementAddress
        state.printNums = data.printingSheetsNumber
        const copyContentSelected = findIncludes(state.copyContent, data.copyContent)
        const copyPurposeSelected = findIncludes(state.copyPurpose, data.copyPurpose)
        copyContentSelected.forEach(index => {
          state.copyContent[index].checked = true
        })

        copyPurposeSelected.forEach(index => {
          state.copyPurpose[index].checked = true
        })
      }
    }

    const getCopyCotent = async () => {
      const res = await getCopyPurposeContent(applyId)
      console.log(res)
    }

    if (copyDialog) {
      setTimeout(() => {
        Dialog.confirm({
          title: "复印用途说明",
          message: "如不清楚复印用途所需的资料， 请咨询病区医院或对应的报销机构。",
          confirmButtonText: "知道了",
          showCancelButton: false,
          confirmButtonColor: "#00C6B8",
        }).then(() => {
          commit("changeCopyDialog")
        })
      }, 300)
    }

    onMounted(() => {
      console.log(87979)
      initLabelData()
      console.log(21321)
      getCopyCotent()
    })

    const confirm = (location) => {
      let codeStr = ""
      location.forEach(item => {
        codeStr += item.code + ","
      })
      state.areaCode = codeStr.substr(0, codeStr.length - 1)
      state.insuranceLocation = location[0].name + location[1].name
      state.show = false
    }

    const handleNext = () => {
      saveMethods()
    };

    const saveMethods = async () => {
      const { selectedContent, selectedPurpose } = getSelectedLabel()
      if (!validateCopy(selectedContent, selectedPurpose)) return
      commit("changeCopyData", { printNums: state.count, copyContent: selectedContent, copyPurpose: selectedPurpose, insuranceLocation: state.insuranceLocation })
      const postData = {
        applyId,
        copyContent: selectedContent,
        copyPurpose: selectedPurpose,
        printingSheets: state.count,
        reimbursementAddress: state.insuranceLocation,
        reimbursementAddressCode: state.areaCode
      }
      const { returnCode } = await saveCopyContent(postData)

      if (returnCode === 0) {
        router.push("/mailing")
      }
    }

    const validateCopy = (selectedContent, selectedPurpose) => {
      const content = [{
        value: selectedPurpose.length,
        text: "请选择复印用途！"
      },
      {
        value: selectedContent.length,
        text: "请选择复印内容！"
      }, {
        value: state.insuranceLocation,
        text: "请选择保险所在地！"
      }]
      return validateFunc(content)
    }


    const getSelectedLabel = () => {
      let copyContentStr = state.copyContent.reduce((acc, cur, index) => {
        if (cur.checked) {
          acc += cur.name + ','
        }
        return acc
      }, '')
      copyContentStr = copyContentStr.substr(0, copyContentStr.length - 1)

      let copyPurposeStr = state.copyPurpose.reduce((acc, cur, index) => {
        if (cur.checked) {
          acc += cur.name + ','
        }
        return acc
      }, '')
      copyPurposeStr = copyPurposeStr.substr(0, copyPurposeStr.length - 1)
      return {
        selectedContent: copyContentStr,
        selectedPurpose: copyPurposeStr
      }
    }

    const handlePrev = () => {
      const callbackPath = isMyself === 0 ? "/write" : "/signture"
      router.push(callbackPath)
    }

    const reduce = () => {
      if (state.count > 0) {
        state.count--
      }
    }

    const increase = () => {
      state.count++
    }
    return {
      ...toRefs(state),
      areaList,
      confirm,
      buttonContext,
      handleNext,
      handlePrev,
      reduce,
      increase
    }
  }
});
</script>
<style lang="scss" scoped>
.copy-label-wrapper {
  padding: 0.22rem 0.15rem;
  .title {
    font-weight: bold;
  }
  .describe {
    font-size: 0.12rem;
    color: #666666;
  }
  .print-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: .01rem solid #f5f5f5;
    height: .44rem;
    margin-top: .3rem;
    .count-wrapper {
      display: flex;
      align-items: center;
    }
    .count {
      width: .2rem;
      height: .2rem;
      border-radius: 50%;
      text-align: center;
      line-height: .2rem;
      border: .015rem solid #666;
      color: #666;
      font-weight: bold;
    }
    .numbers {
      width: .4rem;
      text-align: center;
    }
  }
  .next-icon {
    width: .24rem;
    height: .24rem;
  }
  .selected {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;
  }
  .location-wrapper {
    display: flex;
    align-items: center;
    height: .44rem;
    margin: .3rem 0;
    border-bottom: .01rem solid #f5f5f5;
  }
}
.over-reduce {
  color: #cccccc !important;
  border: .015rem solid #cccccc !important;
}
</style>