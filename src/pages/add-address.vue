<template>
  <div class="add-address-wrapper">
    <ul>
      <li class="column-item">
        <div class="column-label">收货人</div>
        <van-field v-model="user" placeholder="请输入用户名" />
      </li>
      <li class="column-item">
        <div class="column-label">手机号</div>
        <van-field v-model="phone" placeholder="请输入收货人手机号" />
      </li>
      <li class="column-item" @click="show = true">
        <div class="column-label">所在地区</div>
        <div class="selected" style="padding-right: 0.08rem">
          <span>{{ area ? area : " 请选择省市区县、乡镇等" }}</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <li class="column-item">
        <div class="column-label">详细地址</div>
        <van-field v-model="address" placeholder="请输入详细地址" />
      </li>
    </ul>
    <div class="set-default">
      <div class="set-default-left">
        <div>设置默认地址</div>
        <div class="tips-content">提醒：每次下单会默认推荐使用该地址</div>
      </div>
      <van-switch
        v-model="checked"
        active-color="#4CD864"
        inactive-color="#f5f5f5"
      />
    </div>
    <van-popup v-model:show="show" position="bottom">
      <van-area
        title="选择省市"
        :columns-num="3"
        :area-list="areaList"
        @confirm="confirm"
        @cancel="show = !show"
      />
    </van-popup>
    <BottomButton :buttonContext="buttonContext" @handleDefault="handleBtn" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { areaList } from '@vant/area-data';

import { saveOrUpdateAddress } from "@/service/api"

import BottomButton from "@/components/bottom-button/Index.vue"
import { Toast } from 'vant';
import { checkPhone, createDialog } from '../utils/utils';

const buttonContext = [{
  text: "新增地址", styleBtn: {
    background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
    boxShadow: '0rem .04rem .06rem 0rem rgba(0,155,143,0.17)',
    color: '#fff',
  },
}]
export default defineComponent({
  name: 'App',
  components: {
    BottomButton
  },
  setup() {
    const { getters } = useStore()
    const { getUpdateAddress: updateAddress, getRequestParams: requestParams } = getters
    const { user, phone, area, address, defaultChecked, id } = updateAddress
    const { userId } = requestParams
    const route = useRoute()
    const router = useRouter()
    const { type } = route.query

    const state = reactive({
      user,
      phone,
      area,
      address,
      checked: defaultChecked,
      show: false,
    })

    if (type === 'edit') {
      buttonContext[0].text = '保存'
    } else {
      state.user = ""
      state.phone = "" 
      state.area = ""
      state.address = ""
      state.checked = false
    }

    let areaCode = ""
    const confirm = (address) => {
      areaCode = address.reduce((acc, cur) => {
        return acc += cur.code
      }, "")
      const areaVal = address.reduce((acc, cur) => {
        return acc += cur.name
      }, "")
      state.show = false
      state.area = areaVal
    }


    const handleBtn = async () => {
      if (!validateFrom()) return
      const postData = {
        address: state.area,
        addressCode: areaCode,
        addressDetail: state.address,
        consigneeName: state.user,
        isDefaultAddress: state.checked,
        phone: state.phone,
        userId,
        id
      }
      const { returnCode } = await saveOrUpdateAddress(postData)
      if (returnCode === 0) {
        Toast.success({
          message: type === 'edit' ? "修改成功" : "保存成功",
          onClose() {
            router.go(-1)
          }
        })
      }
    }

    const validateFrom = () => {
      const rules = [{
        text: "请输入收货人姓名！",
        value: state.user,
      }, {
        text: "请输入正确手机号！",
        value: !checkPhone(state.phone),
      }, {
        text: "请选择所在地区！",
        value: state.area,
      }, , {
        text: "请输入详细地址",
        value: state.address,
      }]
      const action = rules.filter(item => !item.value)
      if (action.length) {
        createDialog(action[0].text)
        return false
      } else {
        return true
      }
    }


    return {
      ...toRefs(state),
      buttonContext,
      areaList,
      confirm,
      handleBtn
    }
  }
});
</script>
<style lang="scss" scoped>
.add-address-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.column-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 0.45rem;
  background-color: #fff;
  padding-left: 0.15rem;
  box-sizing: border-box;
  border-bottom: 0.01rem solid #f5f5f5;
  & :deep() .van-field__control {
    text-align: right !important;
  }
  & :deep() input::-webkit-input-placeholder {
    font-size: 0.15rem;
    color: #999999;
  }
  .next-icon {
    width: 0.24rem;
    height: 0.24rem;
  }
  .selected {
    display: flex;
    align-items: center;
  }
}
.set-default {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.15rem;
  background-color: #fff;
  margin-top: 0.1rem;
}
.set-default-left {
  display: flex;
  flex-direction: column;
}

.tips-content {
  color: #999999;
  font-size: 0.12rem;
}
.column-label {
  width: 1rem;
}
</style>