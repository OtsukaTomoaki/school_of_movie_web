import { mount } from '@vue/test-utils'
import CustomCheckbox from '@/components/atoms/CustomCheckBox.vue'  // コンポーネントのパスは適切に変更してください

describe('CustomCheckbox.vue', () => {

  // チェックボックスの初期状態をテスト
  it('初期状態が正しく表示される', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'test-id',
        checked: false,
        text: 'Test Text'
      }
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('id')).toBe('test-id')
    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
    expect(wrapper.text()).toContain('Test Text')
  })

  // チェックボックスをクリックしたときの動作をテスト
  it('チェックボックスがクリックされたときにイベントが発火する', async () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'test-id',
        checked: false
      }
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.emitted().change[0]).toEqual([true])
    expect(wrapper.emitted().input).toBeTruthy()
  })

  // `text` プロパティの影響をテスト
  it('テキストが提供されていない場合は表示しない', () => {
    const wrapper = mount(CustomCheckbox, {
      props: {
        id: 'test-id',
        checked: false
      }
    })

    expect(wrapper.text()).not.toContain('Test Text')
  })
})
