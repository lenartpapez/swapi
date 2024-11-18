import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CharacterCard from '../CharacterCard.vue'
import { createTestingPinia } from '@pinia/testing'
import { useFavoritesStore } from '@/stores/favorites'

const mockCharacter = {
  name: 'Luke Skywalker',
  height: '172',
  mass: '77',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
}

describe('CharacterCard', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    wrapper = mount(CharacterCard, {
      props: {
        character: mockCharacter,
      },
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    })
    store = useFavoritesStore()
  })

  it('renders character name', () => {
    expect(wrapper.text()).toContain('Luke Skywalker')
  })

  it('toggles favorite when star button is clicked', async () => {
    const starButton = wrapper.find('button')
    await starButton.trigger('click')

    expect(store.toggleFavorite).toHaveBeenCalledWith(mockCharacter)
  })

  it('shows additional details when showDetails prop is true', async () => {
    await wrapper.setProps({ showDetails: true })

    expect(wrapper.text()).toContain('Gender: Male')
    expect(wrapper.text()).toContain('Height: 172cm')
    expect(wrapper.text()).toContain('Mass: 77kg')
  })

  it('emits close event when close button is clicked', async () => {
    await wrapper.setProps({ showDetails: true })
    const closeButton = wrapper.find('button[class*="self-end"]')
    await closeButton.trigger('click')

    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('does not show details section when showDetails is false', () => {
    const detailsSection = wrapper.find('div[class*="space-y-1 flex flex-col"]')
    expect(detailsSection.exists()).toBe(false)
  })
})
