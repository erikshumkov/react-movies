import React from 'react'
import MovieItem from './MovieItem'
import { useData } from "../../context/DataContext"
import NotFound from '../NotFound'

export default function MovieList() {
  const { data: movies, loading } = useData()

  return (
    <>
      {movies.length > 0 ?
        (<div className="movie-list">
          {movies.map(movie => <MovieItem key={movie.id} movie={movie} />)}
        </div>)
        :
        (!loading && <NotFound />)}
    </>
  )
}
