import axios from 'axios'
import { MovieGenre } from '@/movieGenreTypes'
import { API_V1_BASE_URL, API_V1_BASE_PARAMS } from './base'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export const FetchMovieGenres = async (): Promise<MovieGenre[]> => {
  const movieGenres: Promise<MovieGenre[]> = axios.get(API_V1_BASE_URL + '/movie_genres', API_V1_BASE_PARAMS).then((response) => {
    return response.data.movie_genres.map((movieGenre: any) => {
      const res: MovieGenre = {
        id: movieGenre.id,
        name: movieGenre.name,
        createdAt: movieGenre.created_at,
        updatedAt: movieGenre.updated_at
      }
      return res
    })
  })
  return movieGenres
}
