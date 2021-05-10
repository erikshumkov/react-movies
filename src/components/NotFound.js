import React, { useEffect } from 'react'
import { useMovie, useMovieUpdate } from "../context/MovieContext"

export default function NotFound() {
  const { term } = useMovie()
  const { toggleNotFound } = useMovieUpdate()

  useEffect(() => {
    toggleNotFound(true)
    // eslint-disable-next-line
    return () => {
      toggleNotFound(false)
    }
  }, [])

  return (
    <div className="search-not-found">
      <h2>
        No match for "{term}", please try another movie title.
      </h2>
    </div>
  )
}
