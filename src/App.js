import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import './css/App.css';
import MovieList from './components/MovieList'
import Pagination from './components/Pagination'
import Movie from './components/pages/Movie'
import StartAtTop from './components/StartAtTop'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import { useData, useUpdateData } from "./context/DataContext"
import { useMovie } from "./context/MovieContext"
import { popularUrl } from "./utilities/links"

function App() {
  const { getData, toggleLoading } = useUpdateData()
  const { notFound } = useMovie()
  const { loading } = useData()

  useEffect(() => {
    getData(popularUrl, () => toggleLoading(false))
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <StartAtTop>
        <>

          <Header />

          <main className="container">
            <Switch>
              <Route exact path="/">
                <Redirect to="/popular/1" />
              </Route>
              <Route exact path="/popular/:num" render={props => {
                return (
                  <>
                    <MovieList />
                    {/* Show / hide pagination, if no movies matches search term, hide it. */}
                    {!notFound && !loading && <Pagination {...props} />}
                  </>
                )
              }} />
              <Route exact path="/movie/:movieid" render={props => <Movie {...props} />} />
            </Switch>
          </main>

          {!loading && <Footer />}

        </>
      </StartAtTop>
    </Router>
  )
}

export default App
