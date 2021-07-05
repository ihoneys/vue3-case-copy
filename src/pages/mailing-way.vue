<template>
  <div class="steps">    
    <HeaderSteps :steps="defineSteps()"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import HeaderSteps from "@/components/steps/Index.vue";

import { defineSteps } from "../utils/utils";

export default defineComponent({
  name: "App",
  components: {
    HeaderSteps,
  },
  setup() {
    return {
      defineSteps
    }
  },
});
</script>

<style>
</style>
