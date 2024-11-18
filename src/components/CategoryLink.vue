<script setup lang="ts">
import type { Category } from '@/types'
import { MoveRight } from 'lucide-vue-next'
defineProps<{
  category: Category
}>()
</script>

<template>
  <RouterLink
    :to="`/${category.to}`"
    class="transform hover:scale-[0.99] flex flex-col gap-y-2 p-4 aspect-square transition-all duration-300 bg-white dark:bg-neutral-800 rounded-lg relative"
  >
    <h2 class="text-xl font-bold">{{ category.title }}</h2>
    <p class="text-neutral-900/50 dark:text-white/50 leading-5">{{ category.description }}</p>
    <MoveRight class="dark:hidden self-end mt-auto" color="black" :size="24" />
    <MoveRight class="hidden dark:block self-end mt-auto" color="white" :size="24" />
  </RouterLink>
</template>
