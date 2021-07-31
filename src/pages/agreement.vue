<template>
  <div class="agreement">
    <h3 class="title">病案复印协议</h3>
    <p class="content" v-html="content"></p>
    <van-button
      class="button__back"
      @click="handleBack"
      type="primary"
      round
      block
      >我已阅读</van-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    scrollTo(0, 0);
    const router = useRouter();
    const content = `<p>
    一、医院受理下列人员和机构复印病案资料的申请，受理申请时，可要求申请人按照下列要求提供有关证明材料（原件）：<br/>
    1.申请人为患者本人的，应当提供其有效身份证明；<br/>
    2.申请人为患者代理人的，应当提供患者及其代理人的有效身份证明、申请人与患者代理关系的法定证明材料；<br/>
    3.申请人为死亡患者近亲属的，应当提供患者死亡证明及其近亲属的有效身份证明、申请人是死亡患者近亲属的法定证明材料；<br/>
    4.申请人为死亡患者近亲属代理人的，应当提供患者死亡证明、死亡患者近亲属及其代理人的有效身份证明，死亡患者与其近亲属关系的法定证明材料，申请人与死亡患者近亲属代理关系的法定证明材料；<br/>
    5.申请人为保险机构的，应当提供保险合同复印件，承办人员的有效身份证明，患者本人或者其代理人同意的法定证明材料；患者死亡的，应当提供保险合同复印件，承办人员的有效身份证明，死亡患者近亲属或者其代理人同意的法定证明材料。合同或者法律另有规定的除外。<br/>
    6.公安、司法机关因办理案件，需要查阅、复印病历资料时，需出具采集证据的法定证明及执行公务人员的有效身份证明。<br/>
    二、病案复印时间<br/>
    正常情况下在病人出院7个工作日后到病案室申请复印病案。<br/>
    复印时间为周一至周五（法定节假日除外）：上午   8：00--12：00  ，下午   3：00--6：00（夏季） 2：30--5：30（冬季）<br/>
    三、复印病案流程<br/>
    1.申请复印：患者或代理人或代理机构出示相关证明，填写《湘雅三医院病历资料复印申请书》，经审核合格后方可复印。<br/>
    2.查找病历：已回收病历归档前调取时间最大为15分钟，归档后病历调取时间最大为10分钟。运行病案及时与病区联系，由专人送至病案室，并在申请人在场的情况下复印。<br/>
    3.复印盖章：病案管理人员将规定允许复印的病历资料进行复印，核对复印件无误，盖“湘雅三医院病案复印专用章”，并装订。<br/>
    </p>`;
    const handleBack = (e) => {
      router.go(-1);
    };
    return {
      content,
      handleBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.agreement {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0.8rem;
  z-index: 9999;
  width: 100%;
  min-height: 8.12rem;
  background-color: #fff;
  box-sizing: border-box;
  .title {
    text-align: center;
    margin-top: .3rem;
  }
  .content {
    display: flex;
    max-height: 99.99rem;
    line-height: 0.3rem;
    font-size: 0.16rem;
    background-color: #fff;
    padding: 0.15rem;
    padding-bottom: 0.8rem;
  }
  .button__back {
    position: fixed;
    bottom: 0.1rem;
    margin-top: 0.8rem;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
