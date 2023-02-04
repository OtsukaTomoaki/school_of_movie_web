import axios from 'axios'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

export interface Message {
  id: string,
  talkRoomId: string,
  userId: string,
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

  const messages: Promise<Message[]> = axios.get(BASE_URL + '/messages', params).then((response) => {
    return response.data.messages.map((message: any) => {
      const res: Message = {
        id: message.id,
        talkRoomId: message.talkRoomId,
        userId: message.userId,
        content: message.content,
        createdAt: message.created_at,
        updatedAt: message.updatedAt
      }
      return res
    })
  })
  return await messages
}
