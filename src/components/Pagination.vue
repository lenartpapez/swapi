<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import IconButton from './IconButton.vue'
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  count: number
  isPending: boolean
  previous?: string | null
  next?: string | null
}>()

const pageSize = computed(() => (props.count > 10 ? 10 : props.count))

const emit = defineEmits<{
  (e: 'previous'): void
  (e: 'next'): void
}>()
</script>

<template>
  <div class="flex justify-between items-center">
    <IconButton :disabled="!previous || isPending" @click="emit('previous')">
      <ChevronLeft v-if="!isPending" :color="!previous ? 'gray' : 'white'" />
    </IconButton>
    <div v-if="isPending" class="h-6 bg-white w-56 dark:bg-neutral-800 animate-pulse rounded-md" />
    <span v-else-if="count" class="text-sm text-neutral-900/50 dark:text-white/50"
      >Showing {{ currentPage * pageSize - pageSize + 1 }} -
      {{ currentPage * pageSize < count ? currentPage * pageSize : count }} of
      {{ count }} results</span
    >
    <IconButton :disabled="!next || isPending" @click="emit('next')">
      <ChevronRight v-if="!isPending" :color="!next ? 'gray' : 'white'" />
    </IconButton>
  </div>
</template>
