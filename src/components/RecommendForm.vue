<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Carousel from 'primevue/carousel';
import {ref} from "vue";
import {useSteamApi} from "@/components/common/use-steam-api.ts";
import type {
  GameCarouselDetails,
  GameDetailsResponse, Player,
  PlayerDetailsResponse,
  PlayerGamesResponse
} from "@/components/composables/recommend-form.ts";
import NewtonCradleLoader from "@/components/NewtonCradleLoader.vue";
import {
  mapGameDetailsResponseToGameDetailsPayload
} from "@/components/common/game-details-mapper.ts";
import {
  type OpenAIGameDetailsPayload,
  type OpenAIResponse,
  useOpenAIApi
} from "@/components/common/use-openai-api.ts";
import CubeLoader from "@/components/CubeLoader.vue";
import FlipCard from "@/components/FlipCard.vue";

const steamApi = useSteamApi()
const openAiApi = useOpenAIApi()

const player1Loading = ref<boolean>(false)
const player2Loading = ref<boolean>(false)
const player1Loaded = ref<boolean>(false)
const player2Loaded = ref<boolean>(false)
const responseLoading = ref<boolean>(false)
const player1Profile = ref<Player>()
const player2Profile = ref<Player>()
const player1GameDetails = ref<GameDetailsResponse[]>()
const player2GameDetails = ref<GameDetailsResponse[]>()
const player1GameDetailsCarousel = ref<GameCarouselDetails[]>([])
const player2GameDetailsCarousel = ref<GameCarouselDetails[]>([])
const currentSteamId1 = ref<string>()
const currentSteamId2 = ref<string>()
const finalResponse = ref<OpenAIResponse>()

const responsiveOptions = ref([
  {
    breakpoint: '1436px',
    numVisible: 2,
    numScroll: 2
  },
  {
    breakpoint: '515px',
    numVisible: 1,
    numScroll: 1
  }
])

const resetPlayer1 = () => {
  player1Profile.value = undefined
  player1GameDetails.value = []
  player1GameDetailsCarousel.value = []
  finalResponse.value = undefined
  player1Loaded.value = false
}

const resetPlayer2 = () => {
  player2Profile.value = undefined
  player2GameDetails.value = []
  player2GameDetailsCarousel.value = []
  finalResponse.value = undefined
  player2Loaded.value = false
}

const getPlayerBySteamId = async (isPlayer1: boolean) => {
  if ((!currentSteamId1.value && isPlayer1) || (!currentSteamId2.value && !isPlayer1)) return
  const payloadId = isPlayer1 ? currentSteamId1.value : currentSteamId2.value
  if (isPlayer1) {
    resetPlayer1()
    player1Loading.value = true
  } else {
    resetPlayer2()
    player2Loading.value = true
  }
  const playerInfo: PlayerDetailsResponse = await steamApi.getPlayerSummary({ userId: payloadId })
  const playerGames: PlayerGamesResponse = await steamApi.getPlayerGames({ userId: payloadId })
  const gameDetailsPayload = playerGames.games.sort(
    (a, b) => a.playtime_forever > b.playtime_forever ? -1 : 1).slice(0, 10)
  let gameDetails = []
  for (let i = 0; i < gameDetailsPayload.length; i++) {
    const game = gameDetailsPayload[i]
    const gameDetail = await steamApi.getGameDetails({ gameId: `${game.appid}` })
    const id = "" + game.appid
    gameDetails.push(gameDetail[id].data)
  }
  if (isPlayer1) {
    player1Profile.value = playerInfo.players[0]
    player1GameDetails.value = gameDetails
  } else {
    player2Profile.value = playerInfo.players[0]
    player2GameDetails.value = gameDetails
  }
  formatGamesIntoCarousel(isPlayer1)
  if (isPlayer1) {
    player1Loading.value = false
    player1Loaded.value = true
  } else {
    player2Loading.value = false
    player2Loaded.value = true
  }
}

const formatGamesIntoCarousel = (isPlayer1: boolean) => {
  if (isPlayer1) {
    if (!player1GameDetails.value) return
    for (let i = 0; i < player1GameDetails.value.length; i++) {
      const game = player1GameDetails.value[i]
      const gameDetail: GameCarouselDetails = {
        gameName: game.name,
        gameImgUrl: game.capsule_image
      }
      player1GameDetailsCarousel.value.push(gameDetail)
    }
  } else {
    if (!player2GameDetails.value) return
    for (let i = 0; i < player2GameDetails.value.length; i++) {
      const game = player2GameDetails.value[i]
      const gameDetail: GameCarouselDetails = {
        gameName: game.name,
        gameImgUrl: game.capsule_image
      }
      player2GameDetailsCarousel.value.push(gameDetail)
    }
  }
}

const compareUserProfiles = async () => {
  if (!player1GameDetails.value || !player2GameDetails.value) return
  responseLoading.value = true
  const player1GameDetailsPayload = mapGameDetailsResponseToGameDetailsPayload(player1GameDetails.value)
  const player2GameDetailsPayload = mapGameDetailsResponseToGameDetailsPayload(player2GameDetails.value)
  const payload: OpenAIGameDetailsPayload = {
    profileOne: player1GameDetailsPayload,
    profileTwo: player2GameDetailsPayload
  }
  finalResponse.value = await openAiApi.compareProfiles(payload)
  responseLoading.value = false
}

</script>

<template>
  <div class="recommend-form">
    <div class="recommend-form__title">
      <h4>Add Players</h4>
    </div>
    <div class="recommend-form__add-players">
      <div class="recommend-form__player-input">
        <div class="recommend-form__player-input-flex-center">
          <InputText v-model="currentSteamId1" placeholder="Player 1 Steam ID" />
          <Button @click.stop.prevent="() => getPlayerBySteamId(true)"><i class="pi pi-check"/></Button>
        </div>
        <div v-if="player1Profile && player1GameDetails && !player1Loading">
          <h4 style="color: var(--p-sky-300)">{{ player1Profile?.personaname }}</h4>
        </div>
        <div v-if="player1Loading">
          <NewtonCradleLoader/>
        </div>
        <Carousel class="recommend-form__carousel"
                  :value="player1GameDetailsCarousel"
                  :num-scroll="3"
                  :num-visible="3"
                  :responsive-options="responsiveOptions">
          <template #item="slotProps">
            <div class="recommend-form__game-card">
              <img :src="slotProps.data.gameImgUrl" alt="Game Image" style="width: 6rem;" />
              <h5 style="color: var(--p-sky-300); width: 100%;">{{ slotProps.data.gameName }}</h5>
            </div>
          </template>
          <template #empty>
            <div>
            </div>
          </template>
        </Carousel>
      </div>
      <div class="recommend-form__player-input">
        <div class="recommend-form__player-input-flex-center">
          <InputText v-model="currentSteamId2" placeholder="Player 2 Steam ID" />
          <Button @click.stop.prevent="() => getPlayerBySteamId(false)"><i class="pi pi-check"/></Button>
        </div>
        <div v-if="player2Profile && player2GameDetails && !player2Loading">
          <h4 style="color: var(--p-sky-300)">{{ player2Profile?.personaname }}</h4>
        </div>
        <div v-if="player2Loading">
          <NewtonCradleLoader/>
        </div>
        <Carousel class="recommend-form__carousel"
                  :value="player2GameDetailsCarousel"
                  :num-scroll="3"
                  :num-visible="3"
                  :responsive-options="responsiveOptions">
          <template #item="slotProps">
            <div class="recommend-form__game-card">
              <img :src="slotProps.data.gameImgUrl" alt="Game Image" style="width: 6rem;" />
              <h5 style="color: var(--p-sky-300); width: 100%;">{{ slotProps.data.gameName }}</h5>
            </div>
          </template>
          <template #empty>
            <div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
    <div class="recommend-form__submit-btn" v-if="player1Loaded && player2Loaded && !finalResponse && !responseLoading">
      <Button @click.stop.prevent="compareUserProfiles" label="Find Compatible Games">
        <template #icon>
          <i class="pi pi-search"/>
        </template>
      </Button>
    </div>
    <div v-if="responseLoading" class="recommend-form__loading">
      <CubeLoader/>
    </div>
    <div v-if="finalResponse && !responseLoading" class="recommend-form__final-response">
      <FlipCard :explanation="finalResponse.response" :game-name="finalResponse.gameName"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.recommend-form {
  width: 75%;
  gap: 1rem;
  margin: auto;
  background-color: #151515;
  border-radius: 1rem;
  min-height: 40vh;

  &__final-response {
    padding: 2rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__submit-btn {
    display: flex;
    margin: auto;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }

  &__loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    min-height: 20vh;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    padding: 2rem;
    color: var(--p-sky-300)
  }

  &__carousel {
    max-width: 30rem;
  }

  @media only screen and (max-width: 89.75rem) {
    &__carousel {
      max-width: 20rem;
    }
  }

  @media only screen and (max-width: 32.1875rem) {
    &__carousel {
      max-width: 15rem;
    }
  }

  &__game-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }

  &__add-players {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    gap: 1rem;
    padding: 1rem;
  }

  &__player-input {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1.2rem;
    justify-content: start;
    align-items: center;
    background-color: #111111;
    border-radius: 1rem;
    min-height: 20vh;
    &-flex-center {
      display: flex;
      gap: 1rem;
      max-height: 2.4rem;
    }
  }
}

@media only screen and (max-width: 61.5rem) {
  .recommend-form {
    &__add-players {
      grid-template-columns: 1fr;
    }
  }
}

@media only screen and (max-width: 30rem) {
  .recommend-form {
    width: 95%;
  }
}
</style>
