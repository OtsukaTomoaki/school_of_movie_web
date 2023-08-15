import axios from 'axios'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from './base'
import { MovieUserLikeType } from '@/movieUserLikeTypes'
axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export const PostMovieUserLike = async (movieId: string): Promise<MovieUserLikeType> => {
  const body = {
    movie_user_like: {
      movie_id: movieId
    }
  }
  const response = await axios.post(API_V1_BASE_URL + `/movie_user_likes`, body, API_V1_BASE_PARAMS)
  return {
    id: response.data.id,
    movieId: response.data.movie_id,
    userId: response.data.user_id,
    createdAt: response.data.created_at,
  } as MovieUserLikeType
}

export const DeleteMovieUserLike = async (movieId: string): Promise<MovieUserLikeType> => {
  const response = await axios.delete(API_V1_BASE_URL + `/movie_user_likes?movie_id=${movieId}`, API_V1_BASE_PARAMS)
  return {
    id: response.data.id,
    movieId: response.data.movie_id,
    userId: response.data.user_id,
    createdAt: response.data.created_at,
  } as MovieUserLikeType
}

export const FetchMovieUserLikes = async (userId: string = null, movieId: string = null): Promise<MovieUserLikeType[]> => {
  const query = new URLSearchParams()
  if (userId) {
    query.append('user_id', userId)
  }
  if (movieId) {
    query.append('movie_id', movieId)
  }
  const response = await axios.get(API_V1_BASE_URL + `/movie_user_likes?${query.toString()}`, API_V1_BASE_PARAMS)
  return response.data.movie_user_likes.map((movieUserLike: any) => {
    return {
      id: movieUserLike.id,
      movieId: movieUserLike.movie_id,
      userId: movieUserLike.user_id,
      createdAt: movieUserLike.created_at,
    } as MovieUserLikeType
  })
}