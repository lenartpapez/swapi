import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Favorite } from '@/types'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Favorite[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))

  function toggleFavorite(favorite: Favorite) {
    favorites.value = favorites.value.some((f) => f.url === favorite.url)
      ? favorites.value.filter((f) => f.url != favorite.url)
      : [...favorites.value, favorite]
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }

  return { favorites, toggleFavorite }
})
