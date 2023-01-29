import axios from 'axios'
import { GET_AUTHORIZATION_TOKEN } from '@/store/mutation-types'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

export interface TalkRoom {
  id: string,
  name: string,
  describe: string,
  status: string,
  createdAt: Date,
  updatedAt: Date
}

export const FetchTalkRooms = async (): Promise<TalkRoom[]> => {
  const headerParam = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const talkRooms: Promise<TalkRoom[]> = axios.get(BASE_URL + '/talk_rooms', headerParam).then((response) => {
    return response.data.talk_rooms.map((talkRoom: any) => {
      const res:TalkRoom = {
        id: talkRoom.id,
        name: talkRoom.name,
        describe: talkRoom.describe,
        status: talkRoom.status,
        createdAt: talkRoom.created_at,
        updatedAt: talkRoom.updatedAt
      }
      return res
    })
  })
  return talkRooms
}
