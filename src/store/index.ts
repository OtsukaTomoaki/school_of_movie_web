import { createStore } from 'vuex'
import log from './log'
import Authorization from './authorization'
import movieSearchConditions from './movieSearchConditions'

import createPersistedState from 'vuex-persistedstate'

export default createStore({
  strict: true,
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authorization: Authorization,
    movieSearchConditions: movieSearchConditions
  },
  plugins: [createPersistedState(), log]
})
