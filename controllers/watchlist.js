const Watchlist = require('../models/Watchlist')
const User = require('../models/User')

// @route  POST api/v1/watchlist
// @desc   Add movie to watchlist
// @access Private
exports.addMovie = async (req, res, next) => {
  const { title, movieId, imageSrc } = req.body
  try {
    let movie = await Watchlist.findOne({ title })

    // Check if movie exist
    if (!movie) {
      movie = await Watchlist.create(req.body)

      return res.status(201).json({
        success: true,
        data: movie,
        message: 'Movie successfully added to database.',
      })
    } else {
      return res.status(406).json({ error: 'Movie already exist in watchlist' })
    }
  } catch (error) {
    return res.status(406).json({
      success: false,
      error: 'Something wrong when trying to add movie.',
    })
  }
}

// @route  GET api/v1/watchlist/:userId
// @desc   Get all movies from user
// @access Private
exports.getMovies = async (req, res, next) => {
  const userId = req.params.userId
  try {
    const movies = await Watchlist.find({ user: userId })

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
  const id = req.params.id
  try {
    const movie = await Watchlist.findOneAndDelete({ _id: id })

    // Check if movie exist
    if (!movie) {
      return res.status(404).json({
        success: false,
        data: {},
        message: 'No movie found with that ID.',
      })
    } else {
      res.status(200).json({ success: true, data: {} })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Something wrong when trying to delete movie.',
    })
  }
}
