const express = require('express')
const { login, register, logout, getMe } = require('../controllers/auth')

const { protected } = require('../middleware/protected')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', protected, logout)
router.get('/getMe', protected, getMe)

module.exports = router
