import React from 'react'
import { Link } from 'react-router-dom'

// Context
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user, loading } = useAuth()

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
            <div className='movie-item'>
              <Link to={`/movie/`}>
                <div className='image-container'>
                  {/* <img alt="" /> */}
                  <div className='no-image'>
                    <i className='fas fa-camera'></i>
                    <p>No image</p>
                  </div>
                </div>
                <div className='text-container'>
                  <h3 className='movie-title'>Title</h3>
                  <button className='remove-btn'>Remove</button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  )
}
