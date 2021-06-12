import React, { useEffect } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

// CSS
import './css/App.css'

// Components
import MovieList from './components/Movie/MovieList'
import Pagination from './components/layout/Pagination'
import Movie from './components/Movie/Movie'
import StartAtTop from './components/StartAtTop'
import Footer from './components/layout/Footer'
import Header from './components/layout/Header'
import Auth from './components/Auth/Auth'
import Register from './components/Auth/Register'
import Dashboard from './components/Dashboard/Dashboard'

// Context
import { useData, useUpdateData } from './context/DataContext'
import { useMovie } from './context/MovieContext'
import { useAuth } from './context/AuthContext'

// Utilities
import { popularUrl } from './utilities/links'
import watchlist from './utilities/watchlist'
import PrivateRoute from './components/routing/PrivateRoute'

function App() {
  const { checkLoggedIn, user, authenticated, setWatchlist } = useAuth()
  const { getData, toggleLoading } = useUpdateData()
  const { notFound } = useMovie()
  const { loading } = useData()

  const { getMovies } = watchlist

  useEffect(() => {
    checkLoggedIn()

    if (authenticated && user.data !== undefined) {
      const { _id: userId } = user.data

      ;(async function () {
        console.log('Function ran.')
        const res = await getMovies(userId)

        setWatchlist(res.data)
      })()
    }

    getData(popularUrl, () => toggleLoading(false))
    // eslint-disable-next-line
  }, [authenticated])

  return (
    <Router>
      <StartAtTop>
        <>
          <Header />

          <main className='container'>
            <Switch>
              <Route exact path='/'>
                <Redirect to='/popular/1' />
              </Route>
              <Route
                exact
                path='/auth'
                render={props => {
                  return (
                    <>
                      <Auth {...props} />
                    </>
                  )
                }}
              ></Route>
              <Route
                exact
                path='/register'
                render={props => {
                  return (
                    <>
                      <Register {...props} />
                    </>
                  )
                }}
              ></Route>

              <PrivateRoute exact path='/dashboard' component={Dashboard} />

              <Route
                exact
                path='/popular/:num'
                render={props => {
                  return (
                    <>
                      <MovieList />
                      {/* Show / hide pagination, if no movies matches search term, hide it. */}
                      {!notFound && !loading && <Pagination {...props} />}
                    </>
                  )
                }}
              />
              <Route
                exact
                path='/movie/:movieid'
                render={props => <Movie {...props} />}
              />
            </Switch>
          </main>

          {!loading && <Footer />}
        </>
      </StartAtTop>
    </Router>
  )
}

export default App
