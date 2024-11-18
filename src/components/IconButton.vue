<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    :disabled="disabled"
    @click="emit('click')"
    :class="{ 'hover:bg-gray-50 dark:hover:bg-neutral-700': !disabled }"
    class="w-10 h-10 flex items-center justify-center bg-white dark:bg-neutral-800 rounded-md shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ring-offset-2 ring-offset-gray-100 dark:ring-offset-neutral-800"
  >
    <slot />
  </button>
</template>
