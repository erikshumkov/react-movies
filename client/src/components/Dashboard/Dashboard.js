import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import watchlist from '../../utilities/watchlist'

// Context
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const [data, setData] = useState([])
  const { user, loading } = useAuth()
  const { _id } = user.data

  const { getMovies, deleteMovie } = watchlist

  function deleteData(index, mongoID) {
    const newData = data.filter((item, i) => i !== index)

    deleteMovie(mongoID)

    setData(newData)
  }

  useEffect(() => {
    ;(async function () {
      const res = await getMovies(_id)

      setData(res.data)
    })()
  }, [])

  return (
    !loading &&
    user.data !== undefined && (
      <div className='watchlist-page'>
        <div className='watchlist-head'>
          <h2>My Watchlist</h2>
        </div>
        <section className='watchlist-body'>
          <p className='message-empty'>
            You don't have any movies stored in your watchlist yet.
          </p>
          <div className='watchlist-list'>
            {data.map((movie, index) => (
              <div className='movie-item' key={index}>
                <Link to={`/movie/${movie.movieId}`}>
                  <div className='image-container'>
                    {movie.imageSrc ? (
                      <img src={movie.imageSrc} alt='' />
                    ) : (
                      <div className='no-image'>
                        <i className='fas fa-camera'></i>
                        <p>No image</p>
                      </div>
                    )}
                  </div>
                </Link>
                <div className='text-container'>
                  <Link to={`/movie/${movie.movieId}`}>
                    <h3 className='movie-title'>{movie.title}</h3>
                  </Link>
                  <button
                    className='remove-btn'
                    onClick={() => deleteData(index, movie._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  )
}
