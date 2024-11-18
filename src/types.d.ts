export interface ApiResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface Category {
  title: string
  to: 'characters' | 'planets' | 'starships'
  apiSlug?: string
  description: string
}

export interface Character {
  name: string
  url: string
  gender: string
  height: string
  mass: string
}

export interface Planet {
  name: string
  url: string
  diameter: string
  population: string
  terrain: string
  climate: string
  gravity: string
}

export interface Starship {
  name: string
  url: string
  length: string
  manufacturer: string
  model: string
  hyperdrive_rating: string
  passengers: string
}

export interface Species {
  name: string
  url: string
}

export type Favorite = Character | Planet | Starship
