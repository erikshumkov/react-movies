import React from 'react'
import AuthService from '../Auth/AuthService'

export default function Dashboard() {
  const user = AuthService.getCurrentUser()

  return <div style={{ color: '#fff' }}>Welcome email@gmail.com</div>
}
