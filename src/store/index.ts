import { createStore } from 'vuex'
import log from './log'
import Authorization from './authorization'
import { UPDATE_AUTHORIZATION_TOKEN } from './mutation-types'

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
    authorization: Authorization
  },
  plugins: [createPersistedState(), log]
})
