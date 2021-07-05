<template>
  <ul class="address-wrapper">
    <li class="address-li" v-for="(item, i) in addressList" :key="i">
      <div class="address-user">
        <div class="address-flex">
          <div class="address-name">{{ item.name }}</div>
          <div class="address-phone">{{ item.phone }}</div>
        </div>
        <img class="edit-icon" src="@/assets/img/edit.png" alt="" />
      </div>
      <div class="address-content">{{ item.address }}</div>
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue';

const addressList = [
  { id: 0, name: "啦啦啦", phone: "150231231231", address: "广东省深圳市南山区贝培大道锡山家园274" },
  { id: 1, name: "阿斯顿", phone: "18999992222", address: "广东省深圳市南山区贝培大道锡山家园274广东省深圳市南山区贝培大道锡山家园274广东省深圳市南山区贝培大道锡山家园274" },
];
export default defineComponent({
  name: 'address',
  setup() {
    return {
      addressList
    }
  }
});
</script>
<style lang="scss" scoped>
.address-wrapper {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 10px 12px;
  box-sizing: border-box;
  .address-flex{
    display: flex;
    align-items: center;
  }
  .address-user{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .address-li {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    padding: 20px 15px;
    border-radius: 6px;
  }
  .address-content {
    font-size: 14px;
    color: #666666;
    width: 90%;
    line-height: 20px;
  }
  .edit-icon {
    width: 14px;
    height: 14px;
  }
  .address-name {
    font-size: 16px;
    font-weight: bold;
  }
  .address-phone {
    font-weight: bold;
    font-size: 14px;
    margin-left: 15px;
  }
  .without {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #707070;
    font-size: 14px;
    img {
      width: 240px;
      height: 179px;
    }
  }
}
</style>