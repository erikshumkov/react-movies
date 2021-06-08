import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useUpdateData, useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import {
  movieDetails,
  getActors,
  getVideos,
  popularUrl,
} from '../../utilities/links'

import watchlist from '../../utilities/watchlist'

import Actors from './Actors'

const Movie = ({ location, match }) => {
  // Data context
  const { getDetails, toggleLoading, getData } = useUpdateData()
  const { data: movies } = useData()

  // Auth context
  const { user } = useAuth()
  const { _id } = user.data

  const { addMovie } = watchlist

  // Movie details state, actors, info about the movie
  const [details, setDetails] = useState({})
  const [actor, setActor] = useState({})
  const [trailer, setTrailer] = useState({})

  // Show more / less actors
  const [toggleActors, setToggleActors] = useState(false)

  const [toggleVideos, setToggleVideos] = useState(false)

  const paramId = +match.params.movieid

  const movieInfo = movies?.find(mov => mov.id === paramId)

  const { poster_path, title, vote_average, overview, release_date } = movieInfo

  const { tagline, genres, runtime, budget } = details
  const { cast } = actor

  // Show all actors, or show less
  const showActors = () => setToggleActors(!toggleActors)

  useEffect(() => {
    try {
      ;(async function () {
        if (movies.length === 0) {
          console.log('Movies empty')
          getData(popularUrl, () => toggleLoading(false))
        }

        const detailsData = await getDetails(movieDetails(paramId))
        setDetails(detailsData)

        const actorsData = await getDetails(getActors(paramId))
        setActor(actorsData)

        const trailerData = await getDetails(getVideos(paramId))
        setTrailer(trailerData)
      })()
    } catch (err) {
      console.error('Rejected:', err)
    }
  }, [paramId, getDetails])

  if (movieInfo === undefined) {
    return <Redirect to='/popular/1' />
  } else {
    if (movieInfo !== undefined)
      return (
        <>
          <div className='movie'>
            <div className='movie-image'>
              {poster_path !== null ? (
                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt=''
                />
              ) : (
                <div className='no-image'>
                  <i className='fas fa-camera'></i>
                  <p>No image</p>
                </div>
              )}
            </div>
            <div className='movie-information'>
              <div className='information-header'>
                <h1>{title}</h1>
                <span>{vote_average}</span>
              </div>
              <div className='information-body'>
                <h2>{tagline !== '' ? tagline : ''}</h2>
                <button
                  className='add-watchlist'
                  onClick={() =>
                    addMovie(
                      title,
                      paramId,
                      `https://image.tmdb.org/t/p/w300${poster_path}`,
                      _id
                    )
                  }
                >
                  <i className='fas fa-plus'></i>
                  <span>Add to Watchlist</span>
                </button>
                <div className='movie-description'>{overview}</div>
                <div className='genres'>
                  <p>Genres:</p>
                  {genres !== undefined
                    ? genres.map(genre => (
                        <span key={genre.id} className='genre-tag'>
                          {genre.name}
                        </span>
                      ))
                    : ''}
                </div>
              </div>
              <div className='information-footer'>
                <div className='release-date'>
                  <i className='far fa-calendar-alt'></i>
                  <p className='date-desktop'>Release date: {release_date}</p>
                  <p className='date-mobile'>{release_date.split('-')[0]}</p>
                </div>
                <div className='duration'>
                  <i className='fas fa-hourglass-half'></i>
                  <p className='duration-desktop'>
                    Duration: {runtime} minutes
                  </p>
                  <p className='duration-mobile'>{runtime} min</p>
                </div>
                {budget !== undefined && budget > 0 && (
                  <div className='budget'>
                    <i className='fas fa-wallet'></i>
                    <p className='budget-desktop'>Budget: ${budget}</p>
                    <p className='budget-mobile'>${budget}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='trailer cast'>
            <div className='cast-header'>
              <h2>Trailers</h2>
              <div className='show-all'>
                <button onClick={() => setToggleVideos(!toggleVideos)}>
                  {toggleVideos ? 'Show less' : 'See all videos'}
                </button>
              </div>
            </div>
            <div className='trailer-grid'>
              {trailer.results !== undefined
                ? trailer.results.map((clip, index) => {
                    if (toggleVideos)
                      return (
                        <div key={clip.id} className='youtube-clip'>
                          <h4>{clip.name}</h4>
                          <iframe
                            width='480'
                            height='315'
                            src={`https://www.youtube.com/embed/${clip.key}`}
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          ></iframe>
                        </div>
                      )
                    else if (index < 2)
                      return (
                        <div key={clip.id} className='youtube-clip'>
                          <h4>{clip.name}</h4>
                          <iframe
                            width='480'
                            height='315'
                            src={`https://www.youtube.com/embed/${clip.key}`}
                            title='YouTube video player'
                            frameBorder='0'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                          ></iframe>
                        </div>
                      )
                  })
                : null}
            </div>
          </div>

          <div className='cast'>
            <div className='cast-header'>
              <h2>Actors</h2>
              <div className='show-all'>
                <button onClick={showActors}>
                  {toggleActors ? 'Show less' : 'See full cast'}
                </button>
              </div>
            </div>
            <div className='actors-container'>
              {cast !== undefined
                ? cast.map((actor, index) => {
                    if (toggleActors) {
                      return <Actors key={actor.id} actor={actor} />
                    } else if (index < 6) {
                      return <Actors key={actor.id} actor={actor} />
                    }
                    return null
                  })
                : null}
            </div>
          </div>
        </>
      )
  }
}

export default Movie
