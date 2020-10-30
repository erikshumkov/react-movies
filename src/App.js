import React, { useState, useEffect } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom"
import './scss/App.scss';
import logo from "./images/cinema-logo.png";
import MovieList from './components/MovieList';
import SearchMovies from './components/SearchMovies';
import Pagination from './components/Pagination';
import Movie from './components/pages/Movie';

function App() {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`;

  const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`

  const nextUrl = (number) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=${number}`
  }

  const getMovies = async (url) => {

    const response = await fetch(url);

    if (response.status !== 200) {
      throw new Error("Failed to fetch the data..");
    }

    const data = await response.json();

    return data;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (term.length > 2 && term !== "") {
      getMovies(searchUrl)
        .then(data => setMovies(data.results))
        .catch(err => console.log('Rejected:', err.message))
    } else if (term === "" && term.length < 2) {
      getMovies(popularUrl)
        .then(data => setMovies(data.results))
        .catch(err => console.log('Rejected:', err.message))
    }
  }

  const nextPage = (num) => {
    getMovies(nextUrl(num))
      .then(data => setMovies(data.results))
      .catch(err => console.log('Rejected:', err.message))
  }

  useEffect(() => {
    getMovies(popularUrl)
      .then(data => setMovies(data.results))
      .catch(err => console.log('Rejected:', err.message))
  }, [popularUrl]);

  return (
    <Router>
      <div className="App">
        <header className="container">
          <div className="navigation">
            <div className="logo">
              <Link to={"/popular/1"} onClick={() => {
                nextPage(1)
              }}>
                <img src={logo} alt="" />
              </Link>
            </div>
            <SearchMovies onSubmit={onSubmit} setTerm={setTerm} />
          </div>
        </header>


        <main className="container">
          <Switch>
            <Route exact path="/">
              <Redirect to="/popular/1" />
            </Route>
            <Route exact path="/popular/:num" render={(props) => {
              return (
                <>
                  <MovieList movies={movies} />
                  <Pagination {...props} nextPage={nextPage} />
                </>
              )
            }} />
            <Route exact path="/movie/:movieid" render={(props) => <Movie {...props} movies={movies} getMovies={getMovies} />} />
          </Switch>
        </main>
        <footer className="container">
          <div className="copy">
            &copy; 2020, Erik Shumkov <span role="img" aria-label="">👍</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
