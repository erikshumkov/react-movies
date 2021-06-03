import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthService from '../Auth/AuthService'

const user = AuthService.getCurrentUser()

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      !user ? <Redirect to='/auth' /> : <Component {...props} />
    }
  />
)

export default PrivateRoute
