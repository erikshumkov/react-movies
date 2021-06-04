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
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  return axios
    .post(
      `${API}/login`,
      {
        email,
        password,
      },
      config
    )
    .then(res => {
      // if (res.data.token) {
      //   localStorage.setItem('user', JSON.stringify(res.data))
      // }
      console.log(res.data)

      return res.data
    })
}

const logout = () => {
  localStorage.removeItem('user')

  return axios
    .get(`${API}/logout`)
    .then(res => {
      console.log(res, 'Logged out')
    })
    .catch(err => console.error('Something went wrong, when logging out'))
}

const getCurrentUser = () => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }
  // return JSON.parse(localStorage.getItem('user'))
  return axios
    .get(`${API}/getMe`, config)
    .then(res => console.log(res.data, 'Get user.'))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
}
