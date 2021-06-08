const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WatchlistSchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  movieId: {
    type: Number,
  },
  imageSrc: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
})

module.exports = Watchlist = mongoose.model('watchlist', WatchlistSchema)
