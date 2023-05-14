import axios from 'axios'
import { Movie, MovieGenre } from '@/apis/types'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

export const FetchMovies = async (): Promise<Movie[]> => {
  const headerParam = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const movies: Promise<Movie[]> = axios.get(BASE_URL + '/movies', headerParam).then((response) => {
    return response.data.movies.map((movie: any) => {
      const res:Movie = {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.release_date,
        voteCount: movie.vote_count,
        voteAverage: movie.vote_average,
        posterPath: movie.poster_path,
        backdropPath: movie.backdrop_path,
        originalLanguage: movie.original_language,
        movieGenres: movie.movie_genres
      }
      return res
    })
  })
  return movies
}
