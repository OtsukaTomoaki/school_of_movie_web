import { mount } from '@vue/test-utils'
import { createStore } from 'vuex'
import MovieDetailSearch from '@/components/organisms/MovieDetailSearch.vue'
import CustomCheckBox from '@/components/atoms/CustomCheckBox.vue'
import CustomButton from '@/components/atoms/CustomButton.vue'

const mockStore = createStore({
  getters: {
    GET_MOVIE_SEARCH_CONDITIONS: () => ({ movieGenreIds: [], searchGenreAnd: false })
  }
})

// Mock the FetchMovieGenres API
jest.mock('@/apis/movie_genres', () => {
  return {
    FetchMovieGenres: jest.fn(() => [
      { id: '1', name: 'Action' },
      { id: '2', name: 'Adventure' }
    ])
  }
})

describe('MovieDetailSearch.vue', () => {

  it('mounts and fetches movie genres', async () => {
    const wrapper = mount(MovieDetailSearch, {
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const checkboxes = wrapper.findAllComponents(CustomCheckBox)
    expect(checkboxes.length).toBe(2)
    expect(checkboxes[0].props().text).toBe('Action')
    expect(checkboxes[1].props().text).toBe('Adventure')
  })

  it('emits the right data when search button is clicked', async () => {
    const wrapper = mount(MovieDetailSearch, {
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    const checkbox = await wrapper.findAll('.checkbox-label')[0]
    await checkbox.trigger('change')
    await wrapper.vm.$nextTick()

    await wrapper.findComponent(CustomButton).trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted().result[0]).toEqual([{
      movieGenreIds: ['1'],  // or any other expected data based on your state
      searchGenreAnd: false
    }])
  })

  it('updates selected genres when checkboxes are clicked', async () => {
    const wrapper = mount(MovieDetailSearch,{
      global: {
        plugins: [mockStore]
      }
    })

    await wrapper.vm.$nextTick()

    const checkboxes = wrapper.findAllComponents(CustomCheckBox)
    await checkboxes[0].trigger('change')
    expect(wrapper.vm.selectedMovieGenres).toContain('1')

    await checkboxes[0].trigger('change')
    expect(wrapper.vm.selectedMovieGenres).not.toContain('1')
  })
})
