import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// Context
import { useAuth } from '../../context/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticated, loading } = useAuth()

  return (
    <Route
      {...rest}
      render={props =>
        !authenticated && !loading ? (
          <Redirect to='/auth' />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PrivateRoute
