import axios from "axios";
import type {
  GameDetailsResponse, PlayerDetailsResponse,
  PlayerGamesResponse
} from "@/components/composables/recommend-form.ts";

export interface SteamUserPayload {
  userId?: string
  gameId?: string
}

export const useSteamApi = () => {

  const getPlayerSummary = async (payload: SteamUserPayload): Promise<PlayerDetailsResponse> => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-user',
      payload)
    return response.data.response
  }

  const getPlayerGames = async (payload: SteamUserPayload): Promise<PlayerGamesResponse> => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-owned-games',
      payload)
    return response.data.response
  }

  const getGameDetails = async (payload: SteamUserPayload) => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-game-details',
      payload)
    return response.data
  }

  return { getPlayerSummary, getPlayerGames, getGameDetails }
}
