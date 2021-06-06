import axios from 'axios'

const API = 'http://localhost:5000/api/v1/auth'

const register = (email, password, password2) => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  return axios.post(
    `${API}/register`,
    {
      email,
      password,
      password2,
    },
    config
  )
}

const login = async (email, password) => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  const res = await axios.post(
    `${API}/login`,
    {
      email,
      password,
    },
    config
  )

  if (res.status !== 200) {
    throw new Error('Something went wrong when logging in.')
  }

  return res.data
}

const logout = async () => {
  const res = await axios.get(`${API}/logout`, {
    withCredentials: true,
  })

  if (res.status !== 200) {
    throw new Error('Something went wrong, when logging out.')
  }

  console.log('User logged out!')
  return
}

export default {
  register,
  login,
  logout,
}
