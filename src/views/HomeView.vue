<script setup lang="ts">
import CategoryLink from '@/components/CategoryLink.vue'
import type { Category } from '@/types'
const categories: Category[] = [
  {
    title: 'Characters',
    to: 'characters',
    apiSlug: 'people',
    description: 'People from the Star Wars universe',
  },
  {
    title: 'Planets',
    to: 'planets',
    description: 'Planets from the Star Wars universe',
  },
  {
    title: 'Starships',
    to: 'starships',
    description: 'Starships from the Star Wars universe',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <CategoryLink v-for="item in categories" :key="item.to" :category="item" />
  </div>
</template>
