const mongoose = require('../db/connection')

const HikesSchema = new mongoose.Schema({
  hikeTitle: String,
  datePosted: Date,
  author: String,
  drivingDistance: String,
  hikeDuration: String,
  hikeDifficulty: Number,
  hikeContent: String
})

const Hike = mongoose.model('Hike', HikesSchema)

module.exports = Hike
