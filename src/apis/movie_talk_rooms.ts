import axios from 'axios'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from './base'
import { MovieTalkRoomType } from '@/movieTalkRoomTypes'

export const FetchMovieTalkRoom = async (movie_id: string): Promise<MovieTalkRoomType> => {
  const movieTalkRoom: Promise<MovieTalkRoomType> = axios.get(API_V1_BASE_URL + `/movie_talk_rooms/${movie_id}`, API_V1_BASE_PARAMS).then((response) => {
    return {
      id: response.data.id,
      movieId: response.data.movie_id,
      talkRoomId: response.data.talk_room_id
    } as MovieTalkRoomType
  })
  console.log(movieTalkRoom)
  return movieTalkRoom
}