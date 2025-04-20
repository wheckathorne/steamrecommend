import type {GameDetailsResponse} from "@/components/composables/recommend-form.ts";
import type {GameDetailsPayload} from "@/components/common/use-openai-api.ts";


export const mapGameDetailsResponseToGameDetailsPayload = (gameDetails: GameDetailsResponse[]): GameDetailsPayload[] => {
  return gameDetails.map((game) => ({
    gameName: game.name,
    gameDescription: game.short_description,
    gameCategories: game.categories.map((category) => category.description),
    gameGenres: game.genres.map((genre) => genre.description),
  }))
}
