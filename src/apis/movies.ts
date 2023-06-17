import axios from 'axios'
import { Movie } from '@/movieTypes'
import { BackgroundJob } from '@/backgroundJobs'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

export const FetchMovie = async (id: string): Promise<Movie> => {
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const movie: Promise<Movie> = axios.get(BASE_URL + `/movies/${id}`, params).then((response) => {
    return {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview,
      releaseDate: response.data.release_date,
      voteCount: response.data.vote_count,
      voteAverage: response.data.vote_average,
      posterPath: response.data.poster_path,
      backdropPath: response.data.backdrop_path,
      originalLanguage: response.data.original_language,
      movieGenres: response.data.movie_genres
    } as Movie
  })
  return movie
}

export const FetchMovies = async (q: string = null, page = 1): Promise<{movies: Movie[], totalCount: number, backgroundJob: BackgroundJob}> => {
  const query = new URLSearchParams()
  if (q) {
    query.append('q', q)
  }
  query.append('page', page.toString())
  const params = {
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true,
    crossorigin: true
  }

  const movies: Promise<{movies: Movie[], totalCount: number, backgroundJob: BackgroundJob}> = axios.get(BASE_URL + `/movies?${query.toString()}`, params).then((response) => {
    return {
      movies: response.data.movies.map((movie: any) => {
        const res: Movie = {
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
      }),
      totalCount: response.data.meta.total_count,
      backgroundJob: response.data.meta.background_job && {
        id: response.data.meta.background_job.id,
        status: response.data.meta.background_job.status,
        progress: response.data.meta.background_job.progress,
        total: response.data.meta.background_job.total,
        createdAt: response.data.meta.background_job.created_at,
        finishedAt: response.data.meta.background_job.finished_at
      }as BackgroundJob
    }
  })
  return movies
}
