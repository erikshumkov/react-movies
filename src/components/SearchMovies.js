import React from 'react'

const SearchMovies = ({ onSubmit, setTerm }) => {


  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input type="text" name="search" placeholder="Search by movie title" onChange={(e) => setTerm(e.target.value)} />
      <button type="submit" className="search-btn">
        <i className="fas fa-search"></i>
      </button>
    </form>
  )
}

export default SearchMovies
