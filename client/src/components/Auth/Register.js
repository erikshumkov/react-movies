import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <Fragment>
      <div id='login'>
        <div className='container'>
          <div className='login-box'>
            <h3 className='skapa-konto'>Register</h3>

            <form>
              <div className='input-details'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email address'
                />

                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Choose a password (6 characters min length)'
                  minLength='6'
                />

                <input
                  type='password'
                  name='password2'
                  id='password2'
                  placeholder='Confirm password'
                  minLength='6'
                />
              </div>

              <br />

              <button className='login'>Create account</button>
            </form>

            <Link to='/auth' className='forgot'>
              Already registered? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
