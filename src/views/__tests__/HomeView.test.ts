import { describe, it, expect } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import CategoryLink from '@/components/CategoryLink.vue'

describe('HomeView', () => {
  it('renders all category links', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const categoryLinks = wrapper.findAllComponents(CategoryLink)
    expect(categoryLinks).toHaveLength(3)
  })

  it('passes correct props to CategoryLink components', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })
    const categoryLinks = wrapper.findAllComponents(CategoryLink)

    const expectedCategories = [
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

    categoryLinks.forEach((link, index) => {
      expect(link.props('category')).toEqual(expectedCategories[index])
    })
  })

  it('applies correct grid layout classes', () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const container = wrapper.find('div')
    expect(container.classes()).toContain('grid')
    expect(container.classes()).toContain('grid-cols-3')
    expect(container.classes()).toContain('gap-4')
  })
})
