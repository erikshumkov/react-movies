import React from 'react'

export default function Actors({ actor }) {

  const { profile_path, name, character } = actor;

  return (
    <div className="actor">
      <div className="actor-image">
        {profile_path !== null
          ? <img src={`https://image.tmdb.org/t/p/w300/${profile_path}`} alt="" />
          : <div className="no-image">
            <i className="fas fa-camera"></i>
            <p>No image</p>
          </div>
        }
      </div>
      <div className="actor-name">
        <p className="name">{name}</p>
        <div className="char-name">{character}</div>
      </div>
    </div>
  )
}
