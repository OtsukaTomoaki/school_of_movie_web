import {
  UPDATE_AUTHORIZATION_TOKEN,
  UPDATE_REMEMBER_TOKEN
} from './mutation-types'

export default {
  namespaced: true,
  state: {
    auth_token: '',
    remember_token: ''
  },
  getters: {
    getAuthorizationToken (state: any) {
      return state.auth_token
    },
    getRememberToken (state: any) {
      return state.remember_token
    }
  },
  mutations: {
    setAuthorizationToken (state: any, payload: object) {
      state.auth_token = payload
    },
    setRememberToken (state: any, payload: object) {
      state.remember_token = payload
    }
  }
}
