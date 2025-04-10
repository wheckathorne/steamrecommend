<script setup lang="ts">
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {ref} from "vue";
import {useSteamApi} from "@/components/common/use-steam-api.ts";

const steamApi = useSteamApi()

const currentSteamId = ref<string>();

const getPlayerBySteamId = async () => {
  if (!currentSteamId.value) return
  const playerInfo = await steamApi.getPlayerSummary(currentSteamId.value)
  console.log(playerInfo)
}
</script>

<template>
  <div class="recommend-form">
    <Card>
      <template #title>
        <div class="recommend-form__title">Add Player</div>
      </template>
      <template #content>
        <div class="recommend-form__add-player">
          <InputText v-model="currentSteamId" placeholder="Player Steam ID" />
          <Button @click.stop.prevent="getPlayerBySteamId"><i class="pi pi-plus"/></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="scss">
.recommend-form {
  width: 75%;
  gap: 1rem;
  margin: auto;
  &__title {
    font-size: 2rem;
    font-weight: 700;
    padding: 2rem;
    color: var(--p-sky-300)
  }

  &__add-player {
    display: flex;
    gap: 1rem;
    padding: 2rem;
  }

  :deep(.p-card) {
    background-color: #151515;
  }
}
</style>
