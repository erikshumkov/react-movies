import React, { useContext, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api/v1/auth'

const AuthContext = React.createContext()

const UpdateAuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function useUpdateAuth() {
  return useContext(UpdateAuthContext)
}

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)

  async function checkLoggedIn() {
    const res = await axios.get(`${API}/getMe`, {
      withCredentials: true,
    })

    if (res.status !== 200) {
      throw new Error('Failed at /getMe in AuthContext..')
    }

    const data = await res.data

    setAuthenticated(true)
    setLoading(false)
    setUser(data)

    return data
  }

  function toggleAuthenticated() {
    setAuthenticated(false)
  }

  const value = {
    checkLoggedIn,
    authenticated,
    loading,
    user,
  }

  return (
    <AuthContext.Provider value={value}>
      <UpdateAuthContext.Provider value={toggleAuthenticated}>
        {children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  )
}
