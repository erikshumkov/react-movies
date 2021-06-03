import React from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api/v1/auth'

const register = (email, password) => {
  return axios.post(`${API}/register`, {
    email,
    password,
  })
}

const login = (email, password) => {
  return axios
    .post(`${API}/login`, {
      email,
      password,
    })
    .then(res => {
      if (res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }

      return res.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
