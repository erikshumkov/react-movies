import React, { Fragment, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { isEmail } from 'validator'

import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

import AuthService from './AuthService'

const required = value => {
  if (!value) {
    return <div style={{ color: 'red' }}>This field is required!</div>
  }
}

const validEmail = value => {
  if (!isEmail(value)) {
    return <div style={{ color: 'red' }}>This field is required!</div>
  }
}

const checkPassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div style={{ color: 'red' }}>
        The password must be between 6 and 40 characters.
      </div>
    )
  }
}

export default function Register({ history }) {
  const form = useRef()
  const checkBtn = useRef()

  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  })

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = e => {
    e.preventDefault()

    setMessage('')
    setSuccess(false)

    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(formData.email, formData.password).then(
        res => {
          setMessage(res.data.message)
          setSuccess(true)
          history.push('/')
        },
        error => {
          console.log('Error', error)
          setMessage('Error!')
          setSuccess(false)
        }
      )
    }
  }

  return (
    <Fragment>
      <div id='login'>
        <div className='container'>
          <div className='login-box'>
            <h3 className='skapa-konto'>Register</h3>

            <Form onSubmit={handleRegister} ref={form}>
              <div className='input-details'>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email address'
                  value={formData.email}
                  onChange={e => onChange(e)}
                  validations={[required, validEmail]}
                />

                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Choose a password (6 characters min length)'
                  minLength='6'
                  maxLength='40'
                  value={formData.password}
                  onChange={e => onChange(e)}
                  validations={[required, checkPassword]}
                />

                <Input
                  type='password'
                  name='password2'
                  id='password2'
                  placeholder='Confirm password'
                  minLength='6'
                  maxLength='40'
                  value={formData.password2}
                  onChange={e => onChange(e)}
                />
              </div>

              <br />

              <button className='login'>Sign Up</button>

              <CheckButton style={{ display: 'none' }} ref={checkBtn} />
            </Form>

            <Link to='/auth' className='forgot'>
              Already registered? Sign in here
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
