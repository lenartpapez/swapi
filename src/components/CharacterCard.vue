<script setup lang="ts">
import type { Character } from '@/types'
import { useFavoritesStore } from '@/stores/favorites'
import { storeToRefs } from 'pinia'
import { Star } from 'lucide-vue-next'

defineProps<{
  character: Character
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
        {{ character.name }}
      </div>
      <button @click.stop="toggleFavorite(character)">
        <Star :fill="favorites.some((f) => f.url === character.url) ? 'currentColor' : 'none'" />
      </button>
    </div>
    <div v-if="showDetails" class="space-y-1 flex flex-col">
      <div>Gender: {{ character.gender.charAt(0).toUpperCase() + character.gender.slice(1) }}</div>
      <div>Height: {{ character.height }}cm</div>
      <div>Mass: {{ character.mass }}kg</div>
      <button
        class="h-10 self-end px-4 bg-neutral-100 text-neutral-900 dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 dark:text-white rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-offset-2 ring-offset-white dark:ring-offset-neutral-800"
        @click="$emit('close')"
      >
        Close
      </button>
    </div>
  </div>
</template>
