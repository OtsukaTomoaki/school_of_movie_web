export const API_V1_BASE_URL = `${process.env.VUE_APP_ROOT_API}/api/v1`

export const API_V1_BASE_PARAMS = {
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  crossorigin: true
}

export const WEB_SOCKET_BASE_URL = `${process.env.VUE_APP_WEB_SOCKET_URL}/cable`