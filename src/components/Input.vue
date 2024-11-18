<script setup lang="ts">
defineProps<{
  placeholder: string
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    id="search"
    type="text"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeholder"
    class="text-sm bg-white dark:bg-neutral-800 w-full h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 ring-offset-gray-100 dark:ring-offset-neutral-800"
  />
</template>
