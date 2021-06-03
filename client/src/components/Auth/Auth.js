import React, { Fragment, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import AuthService from './AuthService'

const required = value => {
  if (!value) {
    return <div>This field is required!</div>
  }
}

export default function Auth({ history }) {
  const form = useRef()
  const checkBtn = useRef()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = e => {
    e.preventDefault()

    setMessage('')
    setLoading(true)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(formData.email, formData.password).then(
        res => {
          history.push('/dashboard')
          window.location.reload()
        },
        error => {
          console.log('Error', error)
          setLoading(false)
        }
      )
    } else {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <div id='login'>
        <div className='container'>
          <div className='login-box'>
            <h3>Sign In</h3>

            <p>Please type in your email and password.</p>

            <Form onSubmit={handleLogin} ref={form}>
              <div className='input-details'>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email address'
                  value={formData.email}
                  onChange={e => onChange(e)}
                  validations={[required]}
                />

                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  minLength='6'
                  value={formData.password}
                  onChange={e => onChange(e)}
                  validations={[required]}
                />
              </div>

              <br />

              <button className='login' disabled={loading}>
                {loading && <span>Spinner!</span>}
                <span>Sign In</span>
              </button>
              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>

            <Link to='/register' className='forgot'>
              No account? Create one here.
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
