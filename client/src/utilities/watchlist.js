import axios from 'axios'

const API = 'http://localhost:5000/api/v1/watchlist'

const addMovie = (title, movieId, imageSrc, user) => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  return axios.post(
    `${API}`,
    {
      title,
      movieId,
      imageSrc,
      user,
    },
    config
  )
}

const getMovies = async userId => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  const res = await axios.get(`${API}/${userId}`, config)

  if (res.status !== 200) {
    throw new Error('Something went wrong when getting user movies.')
  }

  return await res.data
}

const deleteMovie = id => {
  const config = {
    withCredentials: true,
    credentials: 'include',
  }

  return axios.delete(`${API}/${id}`, config)
}

export default {
  addMovie,
  getMovies,
  deleteMovie,
}
