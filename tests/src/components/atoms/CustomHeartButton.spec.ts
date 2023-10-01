import { shallowMount } from '@vue/test-utils'
import HeartButton from '@/components/atoms/CustomHeartButton.vue'

describe('HeartButton.vue', () => {

  it('should emit events when the button is clicked', async () => {
    const wrapper = shallowMount(HeartButton, {
      props: {
        isLiked: true,
        id: '1',
      }
    })

    await wrapper.vm.$nextTick()
    const checkbox = wrapper.find('.checkbox')
    await checkbox.trigger('change')

    expect(wrapper.emitted().click).toBeTruthy()
    expect(wrapper.emitted().change).toBeTruthy()
    expect(wrapper.emitted().input).toBeTruthy()
  })
})
