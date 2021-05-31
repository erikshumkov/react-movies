import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

export default function Auth() {
  return (
    <Fragment>
      <div id='login'>
        <div className='container'>
          <div className='login-box'>
            <h3>Logga in</h3>

            <p>Slå in din e-postaddress och lösenord.</p>

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

              <button className='login'>Logga in</button>
            </form>

            <Link to='/mina-sidor/anvandare/ny' className='forgot'>
              Ingen användare? Skapa konto här
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
