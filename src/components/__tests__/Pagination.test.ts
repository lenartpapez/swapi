import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  it('disables previous button when no previous page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        count: 10,
        isPending: false,
        previous: null,
        next: 'next-url',
      },
    })

    const prevButton = wrapper.findAll('button')[0]
    expect(prevButton.attributes('disabled')).toBeDefined()
  })

  it('disables next button when no next page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        count: 10,
        isPending: false,
        previous: 'prev-url',
        next: null,
      },
    })

    const nextButton = wrapper.findAll('button')[1]
    expect(nextButton.attributes('disabled')).toBeDefined()
  })

  it('emits previous event when previous button clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 2,
        count: 10,
        isPending: false,
        previous: 'prev-url',
        next: 'next-url',
      },
    })

    await wrapper.findAll('button')[0].trigger('click')
    expect(wrapper.emitted('previous')).toBeTruthy()
  })

  it('emits next event when next button clicked', async () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        count: 10,
        isPending: false,
        previous: null,
        next: 'next-url',
      },
    })

    await wrapper.findAll('button')[1].trigger('click')
    expect(wrapper.emitted('next')).toBeTruthy()
  })

  it('shows loading state when isPending is true', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        count: 10,
        isPending: true,
        previous: null,
        next: 'next-url',
      },
    })

    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })
})
