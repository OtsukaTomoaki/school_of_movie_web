import axios from 'axios'
import VueAxios from 'vue-axios'

const BASE_URL = 'http://localhost:3000/api/v1'

interface AuthorizationTokenObj {
  authorizationToken: string;
  rememberToken: string;
}

export const FetchAuthToken = async (email: string, password: string): Promise<AuthorizationTokenObj> => {
  console.log(email, password)
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
