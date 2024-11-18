import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from '../IconButton.vue'

describe('IconButton', () => {
  it('renders slot content', () => {
    const wrapper = mount(IconButton, {
      slots: {
        default: '<span>Test Icon</span>',
      },
    })
    expect(wrapper.html()).toContain('<span>Test Icon</span>')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(IconButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click when disabled', async () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: true,
      },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies disabled class when disabled prop is true', () => {
    const wrapper = mount(IconButton, {
      props: {
        disabled: true,
      },
    })
    expect(wrapper.classes()).not.toContain('hover:bg-gray-50')
  })
})
