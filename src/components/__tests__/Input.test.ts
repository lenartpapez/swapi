import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
  it('renders with placeholder text', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Search here...',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search here...')
  })

  it('updates value when input changes', async () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Search',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('test value')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test value'])
  })

  it('displays initial model value', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Search',
        modelValue: 'initial value',
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')
  })

  it('has correct styling classes', () => {
    const wrapper = mount(Input, {
      props: {
        placeholder: 'Search',
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    expect(input.classes()).toContain('bg-white')
    expect(input.classes()).toContain('dark:bg-neutral-800')
    expect(input.classes()).toContain('rounded-md')
  })
})
