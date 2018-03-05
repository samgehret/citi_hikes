const mongoose = require('../db/connection')

const CommentsSchema = new mongoose.Schema({
  commentText: String,
  commentor: String,
  dateComment: Date
})

const HikesSchema = new mongoose.Schema({
  hikeTitle: String,
  datePosted: Date,
  author: String,
  drivingDistance: String,
  hikeDuration: String,
  hikeDifficulty: Number,
  hikeContent: String,
  hikeComments: [CommentsSchema]
})
const Hike = mongoose.model('Hike', HikesSchema)

module.exports = Hike
