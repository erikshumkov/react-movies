const express = require('express')
const { addMovie, getMovies, deleteMovie } = require('../controllers/watchlist')

const { protected } = require('../middleware/protected')

const router = express.Router()

router.post('/', protected, addMovie)
router.get('/:userId', protected, getMovies)
router.delete('/:id', protected, deleteMovie)

module.exports = router
