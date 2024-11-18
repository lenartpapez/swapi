import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CategoryLink from '@/components/CategoryLink.vue'
import { MoveRight } from 'lucide-vue-next'
import type { Category } from '@/types'

describe('CategoryLink', () => {
  const category: Category = {
    to: 'characters',
    title: 'Characters',
    description: 'View all Star Wars characters',
  }

  it('renders the category title and description', () => {
    const wrapper = mount(CategoryLink, {
      props: { category },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.text()).toContain(category.title)
    expect(wrapper.text()).toContain(category.description)
  })

  it('renders the MoveRight icon with the correct styles', () => {
    const wrapper = mount(CategoryLink, {
      props: { category },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    const darkIcon = wrapper.find('.hidden.dark\\:block')
    const lightIcon = wrapper.find('.dark\\:hidden')

    expect(darkIcon.exists()).toBe(true)
    expect(darkIcon.getCurrentComponent()?.props.color).toBe('white')

    expect(lightIcon.exists()).toBe(true)
    expect(lightIcon.getCurrentComponent()?.props.color).toBe('black')
  })

  it('applies the correct classes for styling and transitions', () => {
    const wrapper = mount(CategoryLink, {
      props: { category },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    })

    expect(wrapper.classes()).toContain('transform')
    expect(wrapper.classes()).toContain('hover:scale-[0.99]')
    expect(wrapper.classes()).toContain('flex')
  })
})
