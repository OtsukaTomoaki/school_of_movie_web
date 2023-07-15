import {
  UPDATE_MOVIE_SEARCH_CONDITIONS
} from './mutation-types'
import { MovieSearchConditionType } from '@/movieSearchConditionType'

export default {
  namespaced: true,
  state: {
    movieSearchConditions: null
  },
  getters: {
    getMovieSearchConditions (state: any): MovieSearchConditionType {
      return state.movieSearchConditions
    }
  },
  mutations: {
    updateMovieSearchConditions (state: any, payload: MovieSearchConditionType) {
      state.movieSearchConditions = payload
    }
  }
}
