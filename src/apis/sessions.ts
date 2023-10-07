import axios from 'axios'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from './base'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

interface Identity {
  sub: string
  userName: string
  expiresAt: number
}

export const getIdentity = async (): Promise<Identity> => {
  const data = await axios.get(`${API_V1_BASE_URL}/sessions/identity`, API_V1_BASE_PARAMS).then((response) => {
    return {
      sub: response.data.sub,
      userName: response.data.user_name,
      expiresAt: response.data.expires_at
    } as Identity
  })
  return data
}