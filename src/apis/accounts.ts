import axios from 'axios'
import VueAxios from 'vue-axios'

const BASE_URL = 'http://localhost:3000/api/v1'

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
  const token = axios.post(BASE_URL + '/sessions', body, headers).then((response) => {
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
