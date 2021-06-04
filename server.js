const express = require('express')
const app = express()
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/database')
const colors = require('colors')
const cors = require('cors')

const { protected } = require('./middleware/protected')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')

// Init middleware
app.use(cors({ origin: true, credentials: true }))
app.use(express.json({ extended: false }))
app.use(cookieParser())

// Mount routes
app.use('/api/v1/auth', auth)

app.get('/', (req, res) => {
  res.send('Api running')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`.bold.yellow)
)
