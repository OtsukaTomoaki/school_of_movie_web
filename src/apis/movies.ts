import axios from 'axios'
import { Movie } from '@/movieTypes'
import { BackgroundJob } from '@/backgroundJobs'
import { BASE_URL } from './base'
import { MovieSearchConditionType } from '@/movieSearchConditionType'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

export class MovieSearchConditon implements MovieSearchConditionType {
  q: string
  movieGenreIds: string[]
  searchGenreAnd: boolean

  constructor (q: string = null, movieGenreIds: string[] = [], searchGenreAnd = false) {
    this.q = q
    this.movieGenreIds = movieGenreIds
    this.searchGenreAnd = searchGenreAnd
  }
}

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

const GenerateMovieSearchConditionQuery = (movieSearchCondition: MovieSearchConditionType): URLSearchParams => {
  const query = new URLSearchParams()
  if (movieSearchCondition?.q) {
    query.append('q', movieSearchCondition.q)
  }
  if (movieSearchCondition?.movieGenreIds && movieSearchCondition.movieGenreIds?.length > 0) {
    query.append('genre_ids', movieSearchCondition.movieGenreIds.join(','))
    query.append('search_genre_and', movieSearchCondition.searchGenreAnd.toString())
  }

  return query
}

export const FetchMovies = async (movieSearchCondition: MovieSearchConditionType, page = 1, perPage = 50): Promise<{movies: Movie[], totalCount: number, backgroundJob: BackgroundJob}> => {
  const query = GenerateMovieSearchConditionQuery(movieSearchCondition)
  query.append('page', page.toString())
  query.append('per_page', perPage.toString())

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
