const Watchlist = require('../models/Watchlist')
const User = require('../models/User')
const { Mongoose } = require('mongoose')

// @route  POST api/v1/watchlist
// @desc   Add movie to watchlist
// @access Private
exports.addMovie = async (req, res, next) => {
  const { title, movieId, imageSrc, user } = req.body

  try {
    const person = await User.findById(user)
    let movie = await Watchlist.find({ movieId })
    let userExist

    if (movie.length > 0) {
      userExist = movie[0].users.filter(person => {
        return person.user.toString() === user
      })
    }

    // If no movie, add movie to DB.
    if (movie.length === 0) {
      const newMovie = {
        title,
        movieId,
        imageSrc,
        users: [],
      }

      newMovie.users.push({ user: person._id })

      movie = await Watchlist.create(newMovie)

      res.status(201).json({ success: true, data: movie })
    } else if (userExist.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Already added to watchlist.',
      })
    } else {
      // If movie exists, add another user to the movie
      movie[0].users.push({ user: person._id })

      await movie[0].save()
      res.status(200).json({ success: true, data: movie })
    }
  } catch (err) {
    return res.status(406).json({
      success: false,
      err,
    })
  }
}

// @route  GET api/v1/watchlist/:userId
// @desc   Get all movies from user
// @access Private
exports.getMovies = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const movies = await Watchlist.find({ 'users.user': userId })

    res.status(200).json({ success: true, data: movies })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Something wrong when trying to fetch all movies.',
    })
  }
}

// @route  DELETE api/v1/watchlist/:id
// @desc   Delete movie from watchlist
// @access Private
exports.deleteMovie = async (req, res, next) => {
  const movieId = req.params.id
  const userId = req.userId
  try {
    const movie = await Watchlist.findById(movieId)

    // Remove user from the movie users array
    const updateUsersArray = movie.users.filter(
      id => id.user.toString() !== userId
    )

    movie.users = updateUsersArray

    await movie.save()

    // If no users have the movie in their watchlist, remove movie from DB
    if (movie.users.length === 0) {
      await Watchlist.findByIdAndDelete(movieId)

      return res.status(200).json({ success: true, data: {} })
    }

    res.status(200).json({ success: true, data: movie })
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Something wrong when trying to delete movie.',
    })
  }
}
