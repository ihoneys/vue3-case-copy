<template>
  <div>record</div>
</template>

<script lang="ts">
let data: Array<any> = [];
const mockData = () => {
  return Array.from({ length: 50 }).forEach((item, index) => {
    console.log(66);
    data.push({
      name: "李米" + index,
      orderStatus: Math.floor(Math.random() * 10) + 1,
      patientName: "小米" + index,
      date: "2021-04-20 22:4",
      treatmentDate: "2021-04-20",
    });
  });
};
mockData();
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
});
</script>

<style lang="scss" scope>
</style>
