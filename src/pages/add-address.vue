<template>
  <div class="add-address-wrapper">
    <ul>
      <li class="column-item">
        <div class="column-label">收货人人</div>
        <van-field v-model="user" placeholder="请输入用户名" />
      </li>
      <li class="column-item">
        <div class="column-label">手机号</div>
        <van-field v-model="phone" placeholder="请输入收货人手机号" />
      </li>
      <li class="column-item" @click="show = true">
        <div class="column-label">所在地区</div>
        <div class="selected" style="padding-right: 8px">
          <span>{{ area ? area : ' 请选择省市区县、乡镇等' }}</span>
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
    <van-popup v-model:show="show" position="bottom" :style="{ height: '30%' }">
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



const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'];
const buttonContext = [{
  text: "新增地址", styleBtn: {
    background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
    boxShadow: '0px 4px 6px 0px rgba(0,155,143,0.17)',
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

    if (type === 'edit') {
      buttonContext[0].text = '保存'
    }

    console.log(defaultChecked)

    const state = reactive({
      user,
      phone,
      area,
      address,
      checked: defaultChecked,
      show: false,
    })

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
  height: 45px;
  background-color: #fff;
  padding-left: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f5f5;
  & :deep() .van-field__control {
    text-align: right !important;
  }
  & :deep() input::-webkit-input-placeholder {
    font-size: 15px;
    color: #999999;
  }
  .next-icon {
    width: 24px;
    height: 24px;
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
  padding: 15px;
  background-color: #fff;
  margin-top: 10px;
}
.set-default-left {
  display: flex;
  flex-direction: column;
}

.tips-content {
  color: #999999;
  font-size: 12px;
}
.column-label {
  width: 100px;
}
</style>