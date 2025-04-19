<script setup lang="ts">

</script>

<template>
  <div class="home-header">
    <div class="home-header__title header sky-300">Steam Recommends</div>
    <div class="home-header__subtitle header white">Created by WillHuh</div>
  </div>
</template>

<style scoped lang="scss">
.home-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 3rem;
  gap: 2rem;
  &__title {
    font-size: 2.5rem;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 1.25rem;
    font-weight: 400;
  }
}

@media only screen and (max-width: 36.25rem) {
  .home-header {
    align-items: start;
    &__title {
      font-size: 2rem;
    }
    &__subtitle {
      font-size: 1.125rem;
    }
  }
}
</style>
