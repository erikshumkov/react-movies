import React from 'react'

// Context
import { useAuth } from '../../context/AuthContext'

export default function Dashboard() {
  const { user, loading } = useAuth()

  return (
    !loading &&
    user.data !== undefined && (
      <>
        <div style={{ color: '#fff' }}>Welcome {user.data.email}</div>
        <p style={{ color: '#fff' }}>{user.message}</p>
      </>
    )
  )
}
