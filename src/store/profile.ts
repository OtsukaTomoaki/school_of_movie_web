import { GET_PROFILE, UPDATE_PROFILE } from "./mutation-types";
import { Profile } from '@/profileTypes'

export default {
  namespaced: true,
  state: {
    profile: null
  },
  getters: {
    getProfile (state: any): Profile {
      return state.profile
    }
  },
  mutations: {
    updateProfile (state: any, payload: Profile) {
      state.profile = payload
    }
  }
}
