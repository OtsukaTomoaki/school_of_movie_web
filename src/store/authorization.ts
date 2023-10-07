import {
  UPDATE_AUTHORIZATION_TOKEN,
  UPDATE_REMEMBER_TOKEN
} from './mutation-types'

export default {
  namespaced: true,
  state: {
    auth_token: '',
    remember_token: '',
    identity: null
  },
  getters: {
    getAuthorizationToken (state: any) {
      return state.auth_token
    },
    getRememberToken (state: any) {
      return state.remember_token
    },
    getIdentity (state: any) {
      return state.identity
    }
  },
  mutations: {
    setAuthorizationToken (state: any, payload: object) {
      state.auth_token = payload
    },
    setRememberToken (state: any, payload: object) {
      state.remember_token = payload
    },
    setIdentity (state: any, payload: object) {
      console.log('setIdentity', payload)
      state.identity = payload
    }
  }
}
