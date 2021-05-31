const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
      },
      message: 'Please enter a valid email address',
    },
  },
  password: {
    type: String,
    required: [true, 'Password required'],
    trim: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// Hash password before it is saved to the db
UserSchema.pre('save', async function (next) {
  const user = this

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  next()
})

// Create new token
UserSchema.methods.createToken = async function () {
  const user = this

  return await jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  )
}

// Check if hashed password is the same as client password
UserSchema.methods.matchPassword = async function (clientPassword) {
  const user = this

  return await bcrypt.compare(clientPassword, user.password)
}

module.exports = User = mongoose.model('user', UserSchema)
