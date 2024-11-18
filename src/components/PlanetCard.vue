<script setup lang="ts">
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import type { Planet } from '@/types'
import { Star } from 'lucide-vue-next'

defineProps<{
  planet: Planet
  showDetails?: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const store = useFavoritesStore()
const { toggleFavorite } = store
const { favorites } = storeToRefs(store)
</script>

<template>
  <div
    :class="{ 'p-4': showDetails }"
    class="bg-white dark:bg-neutral-800 space-y-4 rounded-md shadow-sm min-w-96"
  >
    <div :class="{ 'h-12 px-4': !showDetails }" class="flex justify-between items-center">
      <div :class="{ 'text-lg font-bold': showDetails }" class="text-center">
        {{ planet.name }}
      </div>
      <button @click.stop="toggleFavorite(planet)">
        <Star :fill="favorites.some((f) => f.url === planet.url) ? 'currentColor' : 'none'" />
      </button>
    </div>
    <div v-if="showDetails" class="space-y-1 flex flex-col">
      <div>Diameter: {{ planet.diameter }}km</div>
      <div>Population: {{ planet.population }}</div>
      <div>Terrain: {{ planet.terrain }}</div>
      <div>Climate: {{ planet.climate }}</div>
      <div>Gravity: {{ planet.gravity }}</div>
      <button
        class="h-10 self-end px-4 bg-neutral-900 text-white dark:bg-neutral-800 dark:text-white rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-800"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>
