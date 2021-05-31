import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import { DataProvider } from "./context/DataContext"

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <MovieProvider>

        <App />

      </MovieProvider>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

