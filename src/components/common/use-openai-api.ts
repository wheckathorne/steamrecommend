import axios from "axios";

export interface GameDetailsPayload {
  gameName: string
  gameDescription: string
  gameCategories: string[]
  gameGenres: string[]
}

export interface OpenAIGameDetailsPayload {
  profileOne: GameDetailsPayload[]
  profileTwo: GameDetailsPayload[]
}

export interface OpenAIResponse {
  response: string
}

export const useOpenAIApi = () => {

  const compareProfiles = async (payload: OpenAIGameDetailsPayload): Promise<OpenAIResponse> => {
    const response = await axios.post(
      'https://steam-recommends-backend-42415a6936b3.herokuapp.com/api/openai/compare',
      payload)
    return response.data
  }

  return { compareProfiles }

}
