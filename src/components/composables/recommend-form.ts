export interface Game {
  appid: number
  playtime_forever: number
}

export interface PlayerGamesResponse {
  games: Game[]
}

export interface Player {
  personaname: string
  avatar: string
}

export interface PlayerDetailsResponse {
  players: Player[]
}

export interface GameCategory {
  id: string
  description: string
}

export interface GameDetailsResponse {
  name: string
  short_description: string
  categories: GameCategory[]
  genres: GameCategory[]
  capsule_image: string
}

export interface GameCarouselDetails {
  gameName: string
  gameImgUrl: string
}
