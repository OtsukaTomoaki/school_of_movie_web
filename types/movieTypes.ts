import { MovieGenre } from './movieGenreTypes'

export interface Movie {
  id: string,
  title: string,
  overview: string,
  releaseDate: Date,
  voteCount: number,
  voteAverage: number,
  posterPath: string,
  backdropPath: string,
  originalLanguage: string,
  movieGenres: MovieGenre[]
}
