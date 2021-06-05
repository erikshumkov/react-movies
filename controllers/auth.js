const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// @route  POST api/v1/auth/login
// @desc   Login user
// @access Public
exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email }).select('+password')

    // Check if user exists
    if (!user) {
      console.log('User not found')
      return res.status(404).json({ error: 'User not found' })
    }

    // Check password match in User model
    const checkPassword = await user.matchPassword(password)

    if (checkPassword) {
      // Create new token in User model
      const token = await user.createToken()

      // Remove password from object
      user.password = undefined

      // Store token in cookies
      return res
        .status(200)
        .cookie('token', token, { httpOnly: false })
        .json({ success: true, token, data: user, message: 'User logged in.' })
    }

    res
      .status(400)
      .json({ success: false, data: {}, message: 'Login unsuccessful' })
  } catch (error) {
    return res.status(404).json({ success: false, error: 'Login unsuccessful' })
  }
}

// @route  POST api/v1/auth/register
// @desc   Register user
// @access Public
exports.register = async (req, res, next) => {
  try {
    // Create new user
    const user = await User.create(req.body)

    // Create new token
    const token = await user.createToken()

    // Store token in cookies
    res
      .status(200)
      .cookie('token', token, { httpOnly: false })
      .json({ success: true, data: { id: user._id, email: user.email }, token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: err })
  }
}

// @route  GET api/v1/auth/logout
// @desc   Logout user
// @access Private
exports.logout = async (req, res) => {
  // Remove token from cookies
  console.log('Logout ran..')

  res.status(200).clearCookie('token').json({
    success: true,
    data: {},
    message: 'User logged out.',
  })
}

// @route  GET api/v1/auth/getMe
// @desc   Get logged in user information
// @access Private
exports.getMe = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(202).json({
        success: false,
        message: 'No user logged in. Please log in.',
      })
    }

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET)

    if (!decodedJWT) {
      return res.status(202).json({
        success: false,
        message: 'Token not valid. Please log in.',
      })
    }

    const user = await User.findById(decodedJWT.id)
    res.status(200).json({
      success: true,
      data: user,
      message: 'User authenticated and logged in.',
    })
  } catch (err) {
    if (!err.statusCode) error.statusCode = 500
    res.status(status).json({ err: err.data })
  }
}
