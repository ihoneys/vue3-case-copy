<template>
  <ul class="address-wrapper" v-if="addressList.length > 0">
    <li
      class="address-li"
      v-for="(item, i) in addressList"
      :key="i"
      @click="handleItem(item)"
    >
      <div class="address-user">
        <div class="address-flex">
          <div class="address-name">{{ item.consigneeName }}</div>
          <div class="address-phone">{{ item.phone }}</div>
        </div>
        <img
          class="edit-icon"
          src="@/assets/img/edit.png"
          alt=""
          @click.stop="editAddress(item)"
        />
      </div>

      <div class="address-content">
        <span class="default-class" v-if="item.isDefaultAddress">默认</span>
        <span>{{ item.address }}{{ item.addressDetail }}</span>
      </div>
    </li>
  </ul>
  <WithoutData :isShow="!addressList.length" />
  <BottomButton :buttonContext="buttonContext" @handleDefault="handleAdd" />
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { getAddressList } from '@/service/api';


import WithoutData from "@/components/widthout-data/Index.vue"
import BottomButton from "@/components/bottom-button/Index.vue"


// const addressList = [
//   { id: 0, name: "啦啦啦", phone: "150231231231", address: "广东省深圳市南山区贝培大道锡山家园274" },
//   { id: 1, name: "阿斯顿", phone: "18999992222", address: "广东省深圳市南山区贝培大道锡山家园274广东省深圳市南山区贝培大道锡山家园274广东省深圳市南山区贝培大道锡山家园274" },
// ];

const buttonContext = [{
  text: "新增地址", styleBtn: {
    background: 'linear-gradient(90deg, #00D2A3 0%, #02C6B8 100%)',
    boxShadow: '0rem .04rem .06rem 0rem rgba(0,155,143,0.17)',
    color: '#fff',
  },
}]
export default defineComponent({
  name: 'addressList',
  components: {
    WithoutData,
    BottomButton
  },
  setup() {
    const { dispatch, getters, commit } = useStore()
    const { getRequestParams: requestParams } = getters
    const router = useRouter()
    const { userId } = requestParams
    const addressList = ref([])
    const getAddressListRequest = async () => {
      const { data } = await getAddressList(userId)
      addressList.value = data
    }
    onMounted(getAddressListRequest)

    const handleItem = (item) => {
      commit("changeCurrentAddressAndId", { addressId: item.id, currentAddress: item.address + item.addressDetail })
      router.go(-1)
    }
    const handleAdd = () => {
      router.push("/addAddress")
    }
    const editAddress = (item) => {
      commitUpdateAddress(item)
      router.push({
        name: "addAddress",
        query: {
          type: "edit"
        }
      })
    }

    const commitUpdateAddress = ({ consigneeName, phone, isDefaultAddress, address, addressDetail, id }) => {
      commit("changeUpdateAddress", { user: consigneeName, phone, defaultChecked: isDefaultAddress, address: addressDetail, area: address, id })
    }
    return {
      addressList,
      buttonContext,
      handleItem,
      handleAdd,
      editAddress
    }
  }
});
</script>
<style lang="scss" scoped>
.address-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: .1rem .12rem;
  box-sizing: border-box;
  .address-flex {
    display: flex;
    align-items: center;
  }
  .address-user {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .address-li {
    display: flex;
    flex-direction: column;
    margin-bottom: .1rem;
    padding: .2rem .15rem;
    border-radius: .06rem;
  }
  .address-content {
    font-size: .14rem;
    color: #666666;
    width: 90%;
    line-height: .2rem;
    margin-top: .06rem;
  }
  .edit-icon {
    width: .14rem;
    height: .14rem;
  }
  .address-name {
    font-size: .16rem;
    font-weight: bold;
  }
  .address-phone {
    font-weight: bold;
    font-size: .14rem;
    margin-left: .15rem;
  }
  .without {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #707070;
    font-size: .14rem;
    img {
      width: 2.4rem;
      height: 1.79rem;
    }
  }
  .default-class {
    font-size: .1rem;
    border: 0.01rem solid #00c6b8;
    background-color: #f0fcfb;
    color: #00c6b8;
    border-radius: .04rem;
    padding: .02rem .04rem;
    margin-right: .1rem;
  }
}
</style>