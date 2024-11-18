import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PlanetCard from '../PlanetCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoritesStore } from '@/stores/favorites'

const mockPlanet = {
  name: 'Tatooine',
  diameter: '10465',
  population: '200000',
  terrain: 'desert',
  climate: 'arid',
  gravity: '1 standard',
  url: 'https://swapi.dev/api/planets/1/',
}

describe('PlanetCard', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    wrapper = mount(PlanetCard, {
      props: {
        planet: mockPlanet,
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    store = useFavoritesStore()
  })

  it('renders planet name', () => {
    expect(wrapper.text()).toContain('Tatooine')
  })

  it('toggles favorite when star button is clicked', async () => {
    const starButton = wrapper.find('button')
    await starButton.trigger('click')
    expect(store.toggleFavorite).toHaveBeenCalledWith(mockPlanet)
  })

  it('shows additional details when showDetails prop is true', async () => {
    await wrapper.setProps({ showDetails: true })
    expect(wrapper.text()).toContain('Diameter: 10465km')
    expect(wrapper.text()).toContain('Population: 200000')
    expect(wrapper.text()).toContain('Terrain: desert')
    expect(wrapper.text()).toContain('Climate: arid')
    expect(wrapper.text()).toContain('Gravity: 1 standard')
  })

  it('emits close event when close button is clicked', async () => {
    await wrapper.setProps({ showDetails: true })
    const closeButton = wrapper.find('button[class*="self-end"]')
    await closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
