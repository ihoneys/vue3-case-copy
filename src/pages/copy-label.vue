<template>
  <div class="copy-label-wrapper">
    <div class="header-title">
      <span class="title">复印内容</span>
      <span class="describe">（可多选）</span>
    </div>
    <LabelList :list="copyContent" />
    <div class="location-wrapper">
      <div style="padding-right: 0.2rem">保险所在地</div>
      <div class="selected" @click="show = true">
        <span>{{ insuranceLocation ? insuranceLocation : "请选择" }}</span>
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
          :class="[count === 1 ? 'over-reduce' : '']"
          @click="reduce"
        >
          -
        </div>
        <div class="numbers">{{ count }}</div>
        <div class="count" @click="increase">+</div>
      </div>
    </div>
    <van-popup v-model:show="show" position="bottom">
      <van-area
        title="选择省市"
        :columns-num="3"
        :columns-placeholder="['请选择', '请选择', '请选择']"
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
      initLabelData()
    })

    const confirm = (location) => {

      state.show = false
      for (const val of location) {
        if (!val) {
          return false
        }
      }
      let codeStr = ""
      location.forEach(item => {
        codeStr += item.code + ","
      })
      state.areaCode = codeStr.substr(0, codeStr.length - 1)
      const crownList = ['北京市', '天津市', '上海市', '重庆市']

      if (crownList.includes(location[0].name)) {
        state.insuranceLocation = location[0].name + location[2].name
      } else {
        state.insuranceLocation = location[0].name + location[1].name + location[2].name
      }

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
      if (state.count > 1) {
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
    border-bottom: 0.01rem solid #f5f5f5;
    height: 0.44rem;
    margin-top: 0.3rem;
    .count-wrapper {
      display: flex;
      align-items: center;
    }
    .count {
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 50%;
      text-align: center;
      line-height: 0.2rem;
      border: 0.015rem solid #666;
      color: #666;
      font-weight: bold;
    }
    .numbers {
      width: 0.4rem;
      text-align: center;
    }
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
  .location-wrapper {
    display: flex;
    align-items: center;
    height: 0.44rem;
    margin: 0.3rem 0;
    border-bottom: 0.01rem solid #f5f5f5;
  }
}
.over-reduce {
  color: #cccccc !important;
  border: 0.015rem solid #cccccc !important;
}
</style>