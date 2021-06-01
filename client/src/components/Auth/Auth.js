import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Auth() {
  return (
    <Fragment>
      <div id='login'>
        <div className='container'>
          <div className='login-box'>
            <h3>Sign In</h3>

            <p>Please type in your email and password.</p>

            <form>
              <div className='input-details'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='E-postaddress'
                />

                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Lösenord'
                  minLength='6'
                />
              </div>

              <br />

              <button className='login'>Sign In</button>
            </form>

            <Link to='/register' className='forgot'>
              No account? Create one here.
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
