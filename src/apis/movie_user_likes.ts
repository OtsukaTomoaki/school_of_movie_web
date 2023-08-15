import axios from 'axios'
import { API_V1_BASE_URL } from './base'
import { MovieUserLikeType } from '@/movieUserLikeTypes'
axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export const PostMovieUserLike = async (movieId: string): Promise<MovieUserLikeType> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }
  const body = {
    movie_user_like: {
      movie_id: movieId
    }
  }
  const response = await axios.post(API_V1_BASE_URL + `/movie_user_likes`, body, params)
  return {
    id: response.data.id,
    movieId: response.data.movie_id,
    userId: response.data.user_id,
    createdAt: response.data.created_at,
  } as MovieUserLikeType
}

export const DeleteMovieUserLike = async (movieId: string): Promise<MovieUserLikeType> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }
  const response = await axios.delete(API_V1_BASE_URL + `/movie_user_likes?movie_id=${movieId}`, params)
  return {
    id: response.data.id,
    movieId: response.data.movie_id,
    userId: response.data.user_id,
    createdAt: response.data.created_at,
  } as MovieUserLikeType
}

export const FetchMovieUserLikes = async (userId: string = null, movieId: string = null): Promise<MovieUserLikeType[]> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }
  const query = new URLSearchParams()
  if (userId) {
    query.append('user_id', userId)
  }
  if (movieId) {
    query.append('movie_id', movieId)
  }
  const response = await axios.get(API_V1_BASE_URL + `/movie_user_likes?${query.toString()}`, params)
  return response.data.movie_user_likes.map((movieUserLike: any) => {
    return {
      id: movieUserLike.id,
      movieId: movieUserLike.movie_id,
      userId: movieUserLike.user_id,
      createdAt: movieUserLike.created_at,
    } as MovieUserLikeType
  })
}