import axios from "axios";

export const useSteamApi = () => {

  const steamKey = 'C8AB94A6B44D614DFCE4A1A4AF4E30FD'

  const getPlayerSummary = async (steamId: string) => {
    const response = await axios.get(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamKey}&steamids=${steamId}`)
    return response.data
  }

  return { getPlayerSummary }
}
