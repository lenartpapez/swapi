<script setup lang="ts">
import CharacterCard from '@/components/CharacterCard.vue'
import IconButton from '@/components/IconButton.vue'
import Pagination from '@/components/Pagination.vue'
import PlanetCard from '@/components/PlanetCard.vue'
import StarshipCard from '@/components/StarshipCard.vue'
import { type ApiResponse, type Character, type Planet, type Starship } from '@/types'
import { useQuery } from '@tanstack/vue-query'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { MoveLeft, X } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const {
  params: { category },
} = useRoute()
const { back } = useRouter()

const page = ref(1)
const search = ref('')
const url = ref(
  `https://swapi.dev/api/${category === 'characters' ? 'people' : category}/?page=${page.value}`,
)

const title = computed(() => {
  if (!category || typeof category !== 'string') {
    return ''
  }
  return category[0].toUpperCase() + category.slice(1)
})

const { isPending, data } = useQuery<
  AxiosResponse<ApiResponse<Character | Planet | Starship>>,
  Error,
  ApiResponse<Character | Planet | Starship>
>({
  queryKey: [category, url],
  queryFn: () => axios.get(url.value),
  select: (data) => data.data,
  staleTime: 1000 * 60 * 5,
})

const previousPage = () => {
  if (data?.value?.previous) {
    url.value = data?.value?.previous
    page.value--
  }
}

const nextPage = () => {
  if (data?.value?.next) {
    url.value = data?.value?.next
    page.value++
  }
}

const modalOpen = ref(false)
const item = ref<Character | Planet | Starship | null>(null)

const toggleModal = (newItem: Character | Planet | Starship | null) => {
  modalOpen.value = !modalOpen.value
  setTimeout(
    () => {
      item.value = newItem
    },
    item.value ? 300 : 0,
  )
}

watch([search], () => {
  url.value = `https://swapi.dev/api/${category === 'characters' ? 'people' : category}/?search=${search.value}`
  page.value = 1
})
</script>

<template>
  <div>
    <div class="space-y-4">
      <div class="flex gap-x-4 items-center">
        <IconButton @click="back">
          <MoveLeft :size="18" />
        </IconButton>
        <h1 class="text-xl font-bold">{{ title }}</h1>
      </div>
      <div class="flex divide-x divide-gray-200 dark:divide-neutral-800">
        <div class="space-y-4 pr-8">
          <div v-if="isPending" class="space-y-1">
            <div
              v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
              :key="i"
              class="text-sm bg-white min-w-96 dark:bg-neutral-800 animate-pulse h-12 rounded-md"
            />
          </div>
          <div v-else>
            <div v-if="category === 'characters'" class="space-y-1">
              <CharacterCard
                class="cursor-pointer"
                @click="toggleModal(character)"
                v-for="character in data?.results"
                :key="character.url"
                :character="character as Character"
              />
            </div>
            <div v-else-if="category === 'planets'" class="space-y-1">
              <PlanetCard
                class="cursor-pointer"
                @click="toggleModal(planet)"
                v-for="planet in data?.results"
                :key="planet.url"
                :planet="planet as Planet"
              />
            </div>
            <div v-else-if="category === 'starships'" class="space-y-1">
              <StarshipCard
                class="cursor-pointer"
                @click="toggleModal(starship)"
                v-for="starship in data?.results"
                :key="starship.url"
                :starship="starship as Starship"
              />
            </div>
          </div>
          <Pagination
            :current-page="page"
            :count="data?.count"
            :previous="data?.previous"
            :is-pending="isPending"
            :next="data?.next"
            @previous="previousPage"
            @next="nextPage"
          />
        </div>
        <div class="space-y-2 pl-8">
          <h2 class="font-bold">Filters</h2>
          <div class="space-y-1">
            <label class="text-sm text-neutral-900/50 dark:text-white/50" for="search">Name</label>
            <input
              id="search"
              type="text"
              v-model="search"
              placeholder="Search"
              class="text-sm w-full h-12 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ring-offset-2 ring-offset-gray-100 dark:ring-offset-neutral-800"
            />
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="modalOpen" class="fixed inset-0 z-50">
        <div class="absolute inset-0 bg-black/50" />
        <div class="relative flex items-center justify-center min-h-screen">
          <div v-if="item">
            <CharacterCard
              v-if="category === 'characters'"
              :character="item as Character"
              :show-details="true"
              @close="toggleModal(null)"
            />
            <PlanetCard
              v-if="category === 'planets'"
              :planet="item as Planet"
              :show-details="true"
              @close="toggleModal(null)"
            />
            <StarshipCard
              v-if="category === 'starships'"
              :starship="item as Starship"
              :show-details="true"
              @close="toggleModal(null)"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
