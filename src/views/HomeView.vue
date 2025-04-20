<script setup lang="ts">
import HomeHeader from "@/components/HomeHeader.vue";
import RecommendForm from "@/components/RecommendForm.vue";
</script>

<template>
  <div class="home-view">
    <HomeHeader/>
    <RecommendForm/>
  </div>
</template>

<style scoped lang="scss">
.home-view {
  padding-bottom: 5rem;
}
</style>
