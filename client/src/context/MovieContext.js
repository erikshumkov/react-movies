import React, { useContext, useState } from "react"

const MovieContext = React.createContext()

const MovieUpdateContext = React.createContext()

export function useMovie() {
  return useContext(MovieContext)
}

export function useMovieUpdate() {
  return useContext(MovieUpdateContext)
}

export function MovieProvider({ children }) {
  const [term, setTerm] = useState("")
  const [notFound, setNotFound] = useState(false)

  function changeSearchTerm(val) {
    setTerm(val)
  }

  function toggleNotFound(bool) {
    setNotFound(bool)
  }

  const stateValue = {
    term,
    setTerm,
    notFound
  }

  const movieFunctions = {
    changeSearchTerm,
    toggleNotFound
  }

  return (
    <MovieContext.Provider value={stateValue}>
      <MovieUpdateContext.Provider value={movieFunctions}>
        {children}
      </MovieUpdateContext.Provider>
    </MovieContext.Provider>
  )
}