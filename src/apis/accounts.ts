import axios from 'axios'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from './base'
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
  const token = axios.post(API_V1_BASE_URL + '/sessions', body, API_V1_BASE_PARAMS).then((response) => {
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

  const token = axios.post(API_V1_BASE_URL + '/sessions/remember_me', body, API_V1_BASE_PARAMS).then((response) => {
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
  const params = API_V1_BASE_PARAMS as any
  params['params'] = {
    onetime_token: onetimeToken,
    type: 'google'
  }

  const token = axios.post(API_V1_BASE_URL + '/users/create_with_social_accounts', body, params).then((response) => {
    const res: AuthorizationTokenObj = {
      authorizationToken: response.data.token,
      rememberToken: response.data.remember_token
    }
    return res
  })
  return token
}

export const FetchProfile = async (): Promise<Profile> => {

  const profile = await axios.get(API_V1_BASE_URL + '/users/profile', API_V1_BASE_PARAMS).then((response) => {
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

export const UpdateProfile = async (id: string, profile: Profile, avatarImage: string): Promise<Profile> => {
  const body = {
    user: {
      name: profile.name,
      tags: profile.tags,
      avatar_image: avatarImage
    }
  }

  const updatedProfile = await axios.put(API_V1_BASE_URL +  `/users/${id}`, body, API_V1_BASE_PARAMS).then((response) => {
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
