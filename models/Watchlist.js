const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WatchlistSchema = new Schema({
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  title: {
    type: String,
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
})

module.exports = Watchlist = mongoose.model('watchlist', WatchlistSchema)
