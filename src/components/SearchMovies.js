import React from 'react'

const SearchMovies = ({ search }) => {
  return (
    <form>
      <input type="text" name="search" placeholder="Search by movie title" onChange={(e) => search(e)} />
      <button type="submit" className="search-btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  )
}

export default SearchMovies
