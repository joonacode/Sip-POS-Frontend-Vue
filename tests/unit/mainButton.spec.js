import {
  mount
} from '@vue/test-utils'
import button from '@/components/atoms/button.vue'

describe('button.vue', () => {
  it('Is spinner show when loading true', () => {
    const wrapper = mount(button, {
      propsData: {
        isLoading: true
      }
    })
    expect(wrapper.find('span').text()).toBe('Loading...')
  })
})
