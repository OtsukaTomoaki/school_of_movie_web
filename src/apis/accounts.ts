import axios from 'axios'
import { GET_AUTHORIZATION_TOKEN } from '@/store/mutation-types'
import { API_V1_BASE_URL } from './base'
import { Profile } from '@/profileTypes'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

interface AuthorizationTokenObj {
  authorizationToken: string;
  rememberToken: string;
}

export const FetchAuthToken = async (email: string, password: string): Promise<AuthorizationTokenObj> => {
  const body = {
    email: email,
    password: password
  }
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const token = axios.post(API_V1_BASE_URL + '/sessions', body, headers).then((response) => {
    const res: AuthorizationTokenObj = {
      authorizationToken: response.data.token,
      rememberToken: response.data.remember_token
    }
    return res
  })
  return token
}

export const FetchAuthTokenWithRememberToken = async (email: string, rememberToken: string): Promise<AuthorizationTokenObj> => {
  const body = {
    email: email,
    remember_token: rememberToken
  }
  const headers = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const token = axios.post(API_V1_BASE_URL + '/sessions/remember_me', body, headers).then((response) => {
    const res: AuthorizationTokenObj = {
      authorizationToken: response.data.token,
      rememberToken: response.data.remember_token
    }
    return res
  })
  return token
}

export const SignUpWithSocialAccounts = async (email: string, onetimeToken: string): Promise<AuthorizationTokenObj> => {
  const body = {
    email: email
  }
  const headerParam = {
    params: {
      onetime_token: onetimeToken,
      type: 'google'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const token = axios.post(API_V1_BASE_URL + '/users/create_with_social_accounts', body, headerParam).then((response) => {
    const res: AuthorizationTokenObj = {
      authorizationToken: response.data.token,
      rememberToken: response.data.remember_token
    }
    return res
  })
  return token
}

export const FetchProfile = async (): Promise<Profile> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const profile = await axios.get(API_V1_BASE_URL + '/users/profile', params).then((response) => {
    const res: Profile = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      tags: response.data.tags
    }
    return res
  })
  return profile
}

export const UpdateProfile = async (id: string, profile: Profile): Promise<Profile> => {
  const body = {
    user: {
      name: profile.name,
      tags: profile.tags
    }
  }
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const updatedProfile = await axios.put(API_V1_BASE_URL +  `/users/${id}`, body, params).then((response) => {
    const res: Profile = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      tags: response.data.tags
    }
    return res
  })
  return updatedProfile
}
