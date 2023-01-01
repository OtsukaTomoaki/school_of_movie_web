import axios from 'axios'
import { GET_AUTHORIZATION_TOKEN } from '@/store/mutation-types'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

interface AuthorizationTokenObj {
  authorizationToken: string;
  rememberToken: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  tags: string[];
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
  const token = axios.post(BASE_URL + '/sessions', body, headers).then((response) => {
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
  const token = axios.post(BASE_URL + '/sessions/remember_me', body, headers).then((response) => {
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

  const token = axios.post(BASE_URL + '/users/create_with_social_accounts', body, headerParam).then((response) => {
    const res: AuthorizationTokenObj = {
      authorizationToken: response.data.token,
      rememberToken: response.data.remember_token
    }
    return res
  })
  return token
}

export const FetchProfile = async (store: any): Promise<Profile> => {
  const headerParam = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${store.getters[GET_AUTHORIZATION_TOKEN]}`
    }
  }

  const profile = axios.get(BASE_URL + '/users/profile', headerParam).then((response) => {
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
