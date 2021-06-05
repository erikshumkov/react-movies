import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { MovieProvider } from './context/MovieContext'
import { DataProvider } from './context/DataContext'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <DataProvider>
        <MovieProvider>
          <App />
        </MovieProvider>
      </DataProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
