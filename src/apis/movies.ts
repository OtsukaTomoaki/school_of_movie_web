import axios from 'axios'
import { Movie } from '@/movieTypes'
import { BackgroundJob } from '@/backgroundJobs'

axios.defaults.headers.withCredentials = true
axios.defaults.headers.crossorigin = true

const BASE_URL = 'http://localhost:3000/api/v1'

export const FetchMovies = async (q: string = null, page = 1): Promise<{movies: Movie[], totalCount: number, backgroundJob: BackgroundJob}> => {
  const query = new URLSearchParams()
  if (q) {
    query.append('q', q)
  }
  query.append('page', page.toString())
  console.log(query)
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
      backgroundJob: {
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
