<template>
  <div class="add-address-wrapper">
    <ul>
      <li class="column-item">
        <div class="column-label">收货人人</div>
        <van-field v-model="value" placeholder="请输入用户名" />
      </li>
      <li class="column-item">
        <div class="column-label">手机号</div>
        <van-field v-model="value" placeholder="请输入收货人手机号" />
      </li>
      <li class="column-item">
        <div class="column-label">所在地区</div>
        <div class="selected" style="padding-right: 8px">
          <span>请选择省市区县、乡镇等</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <li class="column-item">
        <div class="column-label">详细地址</div>
        <van-field v-model="value" placeholder="请输入详细地址" />
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
      <van-picker
        title="选择地区"
        :columns="columns"
        @confirm="show = !show"
        @cancel="show = !show"
      />
    </van-popup>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'];
export default defineComponent({
  name: 'App',
  setup() {
    return {
      value: "",
      show: false,
      columns,
      checked: false
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