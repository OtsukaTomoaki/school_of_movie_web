import axios from 'axios'
import { MovieGenre } from '@/movieGenreTypes'
import { BASE_URL } from './base'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export const FetchMovieGenres = async (): Promise<MovieGenre[]> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const movieGenres: Promise<MovieGenre[]> = axios.get(BASE_URL + '/movie_genres', params).then((response) => {
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
