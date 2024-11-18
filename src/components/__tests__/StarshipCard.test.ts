import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import StarshipCard from '../StarshipCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoritesStore } from '@/stores/favorites'

const mockStarship = {
  name: 'X-wing',
  length: '12.5',
  manufacturer: 'Incom Corporation',
  model: 'T-65 X-wing',
  hyperdrive_rating: '1.0',
  passengers: '0',
  url: 'https://swapi.dev/api/starships/1/',
}

describe('StarshipCard', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    wrapper = mount(StarshipCard, {
      props: {
        starship: mockStarship,
      },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
      },
    })
    store = useFavoritesStore()
  })

  it('renders starship name', () => {
    expect(wrapper.text()).toContain('X-wing')
  })

  it('toggles favorite when star button is clicked', async () => {
    const starButton = wrapper.find('button')
    await starButton.trigger('click')
    expect(store.toggleFavorite).toHaveBeenCalledWith(mockStarship)
  })

  it('shows additional details when showDetails prop is true', async () => {
    await wrapper.setProps({ showDetails: true })
    expect(wrapper.text()).toContain('Length: 12.5m')
    expect(wrapper.text()).toContain('Manufacturer: Incom Corporation')
    expect(wrapper.text()).toContain('Model: T-65 X-wing')
    expect(wrapper.text()).toContain('Hyperdrive Rating: 1.0')
    expect(wrapper.text()).toContain('Passengers: 0')
  })

  it('emits close event when close button is clicked', async () => {
    await wrapper.setProps({ showDetails: true })
    const closeButton = wrapper.find('button[class*="self-end"]')
    await closeButton.trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
