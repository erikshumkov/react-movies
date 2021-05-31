import React from 'react'
import { Link } from "react-router-dom"

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
      <Link to={`/movie/${movie.id}`}>
        <div className="image-container">
          {movie.poster_path !== null
            ? <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt="" />
            : <div className="no-image">
              <i className="fas fa-camera"></i>
              <p>No image</p>
            </div>
          }
          {movie.vote_average > 0
            ? <span className="movie-rating">{movie.vote_average}</span>
            : <span></span>
          }

        </div>
        <div className="text-container">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-genre">{genreIds}</p>
        </div>
      </Link>
    </div>
  )
}

export default MovieItem
