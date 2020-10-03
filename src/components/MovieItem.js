import React from 'react'

const MovieItem = ({ movie }) => {

  const genre = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  const genreIds = movie.genre_ids.map(genId => {
    return genre.find(id => id.id === genId);
  }).map(genreName => genreName.name).join(", ")

  return (
    <div className="movie-item">
      <a href="#!">
        <div className="image-container">
          <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" />
          <span className="movie-rating">{movie.vote_average}</span>
        </div>
        <div className="text-container">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{genreIds}</p>
        </div>
      </a>
    </div>
  )
}

export default MovieItem
