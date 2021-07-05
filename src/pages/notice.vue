<template>
  <div class="content-wrapper">
    <h3 className="headerline">病案复印须知</h3>
    <div>须知内容</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'App',
});
</script>
<style lang="scss" scoped>
.content-wrapper {
  padding: 0 0.15rem;
  background-color: #fff;
  .headerline {
    font-size: 0.18rem;
    color: #333;
    margin-top: 0.3rem;
    margin-bottom: 0.12rem;
  }
}
</style>