import axios from 'axios'
import { API_V1_BASE_URL } from './base'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export interface TalkRoomBodyToCreate {
  name: string,
  describe: string,
  status: number
}
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

  const talkRooms: Promise<TalkRoom[]> = axios.get(API_V1_BASE_URL + '/talk_rooms', headerParam).then((response) => {
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

export const CreateTalkRooms = async (body: TalkRoomBodyToCreate): Promise<TalkRoom> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }
  const talkRoom: Promise<TalkRoom> = axios.post(API_V1_BASE_URL + '/talk_rooms', body, params).then((response) => {
    const result: TalkRoom = {
      id: response.data.id,
      name: response.data.name,
      describe: response.data.describe,
      status: response.data.status,
      createdAt: response.data.created_at,
      updatedAt: response.data.updatedAt
    }
    return result
  })
  return talkRoom
}
