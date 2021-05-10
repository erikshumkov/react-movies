import React from 'react'
import { useMovieUpdate, useMovie } from "../context/MovieContext"
import { useUpdateData } from "../context/DataContext"
import { searchUrl, popularUrl } from "../utilities/links"

export default function SearchMovies() {
  const { term } = useMovie()
  const { getData, toggleLoading } = useUpdateData()
  const { changeSearchTerm } = useMovieUpdate()

  const onSubmit = (e) => {
    e.preventDefault()

    if (term.length > 2 && term !== "") {

      getData(searchUrl(term), () => toggleLoading(false))

    }

    else if (term === "" && term.length < 2) {
      getData(popularUrl, () => toggleLoading(false))
    }
  }

  return (
    <form onSubmit={e => onSubmit(e)}>
      <input type="text" name="search" placeholder="Search by movie title" onChange={e => changeSearchTerm(e.target.value)} />
      <button type="submit" className="search-btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  )
}