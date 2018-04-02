const Hike = require('../models/Hikes')
const User = require('../models/User')
const data = require('./seeds.json')

Hike.remove()
    .then(() => {
      return Hike.collection.insert(data)
    })
    .then(() => {
      process.exit()
    })

User.remove()
.then(() => {
  process.exit()
})
