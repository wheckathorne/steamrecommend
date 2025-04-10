import axios from "axios";

export const useSteamApi = () => {

  const steamKey = '5D7748E3CE9ABAB284088F2A044EF832'

  const getPlayerSummary = async (steamId: string) => {
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId}`)
    return response.data
  }

  return { getPlayerSummary }
}
