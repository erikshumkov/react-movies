const bcrypt = require('bcryptjs')
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
    const checkPassword = user.matchPassword(password)

    if (checkPassword) {
      // Create new token in User model
      const token = await user.createToken()

      // Store token in cookies
      res.cookie('token', token, { httpOnly: true })

      // Remove password from object
      user.password = undefined

      return res.status(200).json({ success: true, token, data: user })
    }

    res.status(400).json({ success: false, data: {} })
  } catch (error) {
    return res.status(404).json({ success: false, error: 'User not found' })
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
    res.cookie('token', token, { httpOnly: true })

    res
      .status(200)
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
  res.cookie('token', 'NoToken', { httpOnly: true, maxAge: 0 })

  res.status(200).json({ success: true, data: {} })
}

// @route  GET api/v1/auth/getMe
// @desc   Get logged in user information
// @access Private
exports.getMe = async (req, res) => {
  const user = await User.findById(req.token.id)

  // Check if user exists
  if (!user) {
    console.log('User not found')
    return res.status(404).json({ error: 'User not found' })
  }

  res.status(200).json({ success: true, data: user })
}
