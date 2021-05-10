import React from 'react'
import { Link } from "react-router-dom"
import { nextUrl } from "../../utilities/links"
import { useUpdateData } from "../../context/DataContext"

import SearchMovies from '../SearchMovies';
import logo from "../../images/cinema-logo.png";

export default function Header() {
  const { getData, toggleLoading } = useUpdateData()

  const nextPage = (num) => {
    getData(nextUrl(num), () => toggleLoading(false))
  }

  return (
    <header className="container">
      <div className="navigation">
        <div className="logo">
          <Link to={"/popular/1"} onClick={() => {
            nextPage(1)
          }}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <SearchMovies />
      </div>
    </header>
  )
}
