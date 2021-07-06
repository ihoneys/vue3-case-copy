<template>
  <div class="steps">
    <ul>
      <HeaderSteps :steps="defineSteps()" />
      <li class="column-flex">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>领取方式</span>
        </div>
        <van-radio-group v-model="checked" direction="horizontal">
          <van-radio name="1">邮寄到付</van-radio>
          <van-radio name="2">到院自取</van-radio>
        </van-radio-group>
      </li>
      <li class="column-flex">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>快递公司</span>
        </div>
        <div class="pd-r-15">EMS</div>
      </li>
      <li class="column-flex">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>邮寄地址</span>
        </div>
        <div class="selected" style="padding-right: 8px">
          <span>请选择</span>
          <img class="next-icon" src="@/assets/img/next.png" alt="" />
        </div>
      </li>
      <div class="express-wrapper">
        <div class="column-flex-left">
          <span class="label-icon">*</span>
          <span>快递公司</span>
        </div>
      </div>
      <div class="take-address">
        南山医院门诊综合楼负一楼病案管理科 备注： 取件时间：工作日：8:00-12:00
      </div>
      <div class="user-tips">
        <div>温馨提醒</div>
        <p class="tips-content">
          除年龄小于1岁患者可由委托人网上预约病案复印，其他患者仅由本人网上申请，如需要委托人办理，请到窗口办理。
        </p>
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import HeaderSteps from '@/components/steps/Index.vue';

import { defineSteps } from '../utils/utils';

const columns = ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华'];

export default defineComponent({
  name: 'App',
  components: {
    HeaderSteps,
  },
  setup() {
    return {
      defineSteps,
      show: false,
      checked: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.steps {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.column-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-bottom: 1px solid #f5f5f5;
  padding-left: 15px;
  & :deep() .van-radio--horizontal {
    margin-right: 0;
    padding-right: 15px;
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
.label-icon {
  color: #f65c44;
  margin-right: 0.07rem;
}
.take-address {
  width: 85%;
  padding-left: 28px;
  line-height: 24px;
}
.express-wrapper {
  height: 44px;
  padding-left: 15px;
  line-height: 44px;;
}
.user-tips {
  padding: 15px;
  background-color: #f5f5f5;
}
.tips-content {
  color: #666666;
  font-size: 12px;
  line-height: 20px;
  margin-top: 4px;
  background-color: #f5f5f5;

}
</style>
