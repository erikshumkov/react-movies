import React, { useState, useEffect } from 'react'
import Actors from '../Actors';

const Movie = ({ movies, location, match, getMovies }) => {
  const [details, setDetails] = useState({});
  const [actor, setActor] = useState({});
  const [toggle, setToggle] = useState(false);

  const paramId = +match.params.movieid;
  const movieInfo = movies.find(mov => mov.id === paramId)
  const { tagline, genres, runtime, budget } = details;
  const { poster_path, title, vote_average, overview, release_date } = movieInfo;
  const { cast } = actor;

  // Show all actors, or show less
  const showActors = () => setToggle(!toggle);


  useEffect(() => {
    getMovies(`https://api.themoviedb.org/3/movie/${paramId}?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US`)
      .then(data => setDetails(data))
      .catch(err => console.log('Rejected:', err.message))

    getMovies(`https://api.themoviedb.org/3/movie/${paramId}/credits?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}`)
      .then(data => setActor(data))
      .catch(err => console.log('Rejected:', err.message))
  }, [paramId, getMovies])

  return (
    <>
      <div className="movie">
        <div className="movie-image">
          {poster_path !== null
            ? <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="" />
            : <div className="no-image">
              <i className="fas fa-camera"></i>
              <p>No image</p>
            </div>
          }
        </div>
        <div className="movie-information">
          <div className="information-header">
            <h1>{title}</h1>
            <span>{vote_average}</span>
          </div>
          <div className="information-body">
            <h2>{tagline !== "" ? tagline : ""}</h2>
            <div className="movie-description">
              {overview}
            </div>
            <div className="genres">
              <p>Genres:</p>
              {genres !== undefined ? genres.map(genre => <span key={genre.id} className="genre-tag">{genre.name}</span>) : ""}
            </div>
          </div>
          <div className="information-footer">
            <div className="release-date">
              <i className="far fa-calendar-alt"></i>
              <p>Release date: {release_date}</p>
            </div>
            <div className="duration">
              <i className="fas fa-hourglass-half"></i>
              <p>Duration: {runtime} minutes</p>
            </div>
            {budget !== undefined && budget > 0 &&
              <div className="budget">
                <i className="fas fa-wallet"></i>
                <p>Budget: ${budget}</p>
              </div>
            }
          </div>
        </div>
      </div>
      <div className="cast">
        <div className="cast-header">
          <h2>Actors</h2>
          <div className="show-all">
            <button onClick={showActors}>Show all</button>
          </div>
        </div>
        <div className="actors-container">
          {cast !== undefined ? cast.map((a, index) => {
            if (toggle) {
              return (
                <Actors key={a.id} actor={a} />
              )
            }
            else if (index < 6) {
              return (
                <Actors key={a.id} actor={a} />
              )
            }
            return null;
          })
            : null
          }

        </div>
      </div>
    </>
  )
}

export default Movie
