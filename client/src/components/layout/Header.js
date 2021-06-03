import React from 'react'
import { Link } from 'react-router-dom'
import { nextUrl } from '../../utilities/links'
import { useMovie } from '../../context/MovieContext'
import { useUpdateData } from '../../context/DataContext'
import AuthService from '../Auth/AuthService'

import SearchMovies from '../SearchMovies'
import logo from '../../images/cinema-logo.png'

export default function Header() {
  const { getData, toggleLoading } = useUpdateData()
  const { setTerm } = useMovie()

  const nextPage = num => {
    getData(nextUrl(num), () => toggleLoading(false))
  }

  return (
    <header className='container'>
      <nav className='navigation'>
        <div className='logo-search'>
          <div className='logo'>
            <Link
              to={'/popular/1'}
              onClick={() => {
                setTerm('')
                nextPage(1)
              }}
            >
              <img src={logo} alt='' />
            </Link>
          </div>
          <SearchMovies />
        </div>

        <div className='sign-in'>
          <ul className='menu desktop'>
            <Link to='/auth'>
              <li>Sign In</li>
            </Link>
            <Link to='/dashboard'>
              <li>Dashboard</li>
            </Link>
            <Link to='/' onClick={AuthService.logout}>
              <li>Sign Out</li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  )
}
