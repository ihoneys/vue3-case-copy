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
  <WithoutData :isShow="isData" />
  <BottomButton :buttonContext="buttonContext" @handleDefault="handleAdd" />
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import { getAddressList } from '@/service/api';


import WithoutData from "@/components/without-data/Index.vue"
import BottomButton from "@/components/bottom-button/Index.vue"
import { isObjEmpty } from '../utils/utils';


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
    const { getters, commit } = useStore()
    const { getRequestParams: requestParams } = getters
    const { userId } = requestParams

    const router = useRouter()

    const addressList = ref([])
    const isData = ref(false)

    const getAddressListRequest = async () => {
      const { data } = await getAddressList(userId)
      if (!isObjEmpty(data)) {
        addressList.value = data
      } else {
        isData.value = true
      }
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
      isData,
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
  padding: 0.1rem 0.12rem;
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
    margin-bottom: 0.1rem;
    padding: 0.2rem 0.15rem;
    border-radius: 0.06rem;
  }
  .address-content {
    font-size: 0.14rem;
    color: #666666;
    width: 90%;
    line-height: 0.2rem;
    margin-top: 0.06rem;
  }
  .edit-icon {
    width: 0.14rem;
    height: 0.14rem;
  }
  .address-name {
    font-size: 0.16rem;
    font-weight: bold;
  }
  .address-phone {
    font-weight: bold;
    font-size: 0.14rem;
    margin-left: 0.15rem;
  }
  .without {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #707070;
    font-size: 0.14rem;
    img {
      width: 2.4rem;
      height: 1.79rem;
    }
  }
  .default-class {
    font-size: 0.1rem;
    border: 0.01rem solid #00c6b8;
    background-color: #f0fcfb;
    color: #00c6b8;
    border-radius: 0.04rem;
    padding: 0.02rem 0.04rem;
    margin-right: 0.1rem;
  }
}
</style>