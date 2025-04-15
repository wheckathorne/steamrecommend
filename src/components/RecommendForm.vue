<script setup lang="ts">
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {ref} from "vue";
import {useSteamApi} from "@/components/common/use-steam-api.ts";

interface Game {
  appid: number
  playtime_forever: number
}

interface PlayerGamesResponse {
  response: {
    games: Game[]
  }
}

const steamApi = useSteamApi()

const currentSteamId = ref<string>();

const getPlayerBySteamId = async () => {
  if (!currentSteamId.value) return
  const playerInfo = await steamApi.getPlayerSummary({ userId: currentSteamId.value })
  const playerGames: PlayerGamesResponse = await steamApi.getPlayerGames({ userId: currentSteamId.value })
  const gameDetailsPayload = playerGames.response.games.sort(
    (a, b) => a.playtime_forever > b.playtime_forever ? -1 : 1).slice(0, 10)
  let gameDetails = []
  for (let i = 0; i < gameDetailsPayload.length; i++) {
    const game = gameDetailsPayload[i]
    const gameDetail = await steamApi.getGameDetails({ gameId: `${game.appid}` })
    gameDetails.push(gameDetail)
  }
  console.log(playerInfo)
  console.log(playerGames)
  console.log(gameDetails)
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
