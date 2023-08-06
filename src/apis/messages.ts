import axios from 'axios'
import { API_V1_BASE_URL } from './base'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

interface MessageOwner {
  id: string,
  name: string
}
export interface Message {
  id: string,
  talkRoomId: string,
  user: MessageOwner,
  content: string,
  createdAt: Date,
  updatedAt: Date
}

export const FetchMessages = async (talkRoomId: string): Promise<Message[]> => {
  const params = {
    params: {
      talk_room_id: talkRoomId
    },
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const messages: Promise<Message[]> = axios.get(API_V1_BASE_URL + '/messages', params).then((response) => {
    return response.data.messages.map((message: any) => {
      const res: Message = {
        id: message.id,
        talkRoomId: message.talk_room_id,
        user: {
          id: message.user.id,
          name: message.user.name
        },
        content: message.content,
        createdAt: message.created_at,
        updatedAt: message.updatedAt
      }
      return res
    })
  })
  return await messages
}
