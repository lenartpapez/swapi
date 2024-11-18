<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import IconButton from './IconButton.vue'

defineProps<{
  currentPage: number
  count?: number
  isPending: boolean
  previous?: string | null
  next?: string | null
}>()

const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'next'): void
}>()
</script>

<template>
  <div class="flex justify-between items-center">
    <IconButton :disabled="!previous || isPending" @click="emit('previous')">
      <ChevronLeft v-if="!isPending" />
    </IconButton>
    <div v-if="isPending" class="h-6 bg-white w-56 dark:bg-neutral-800 animate-pulse rounded-md" />
    <span v-else-if="count" class="text-sm text-neutral-900/50 dark:text-white/50"
      >Showing {{ currentPage * count - count + 1 }} - {{ currentPage * count }} of
      {{ count }} results</span
    >
    <IconButton :disabled="!next || isPending" @click="emit('next')">
      <ChevronRight v-if="!isPending" />
    </IconButton>
  </div>
</template>
