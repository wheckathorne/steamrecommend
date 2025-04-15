import axios from "axios";

export interface SteamUserPayload {
  userId?: string
  gameId?: string
}

export const useSteamApi = () => {

  const getPlayerSummary = async (payload: SteamUserPayload) => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-user',
      payload)
    return response.data
  }

  const getPlayerGames = async (payload: SteamUserPayload) => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-owned-games',
      payload)
    return response.data
  }

  const getGameDetails = async (payload: SteamUserPayload) => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/steam/get-game-details',
      payload)
    return response.data
  }

  return { getPlayerSummary, getPlayerGames, getGameDetails }
}
