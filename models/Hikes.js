const mongoose = require('../db/connection')

const CommentsSchema = new mongoose.Schema({
  commentText: String,
  commentor: String,
  dateComment: Date
})

const HikesSchema = new mongoose.Schema({
  hiker: String,
  hikeNum: Number,
  hikeComments: [CommentsSchema]
})
const Hike = mongoose.model('Hike', HikesSchema)

module.exports = Hike
