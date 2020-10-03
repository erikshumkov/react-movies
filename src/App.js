import React, { useState, useEffect } from 'react';
import './scss/App.scss';
import logo from "./images/cinema-logo.png";
import MovieList from './components/MovieList';
import SearchMovies from './components/SearchMovies';

function App() {
  const [term, setTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovies(data.results))
      .catch(err => console.log(err));
  }

  const search = (e) => {
    setTerm(e.target.value);

    if (term.length > 2 && term !== "") {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIEDB_API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`)
        .then(res => res.json())
        .then(data => setMovies(data.results))
        .catch(err => console.log(err));
    } else if (term === "" && term.length < 2) {
      getMovies();
    }
  }

  return (
    <div className="App">
      <header className="container">
        <div className="navigation">
          <div className="logo">
            <a href="#!">
              <img src={logo} alt="" />
            </a>
          </div>
          <SearchMovies search={search} />
        </div>
      </header>


      <main className="container">
        <MovieList movies={movies} />

        <div className="pagination">
          <div className="prev">&larr;</div>
          <div className="1">1</div>
          <div className="2">2</div>
          <div className="next">&rarr;</div>
        </div>
      </main>
    </div>
  );
}

export default App;
