const Hike = require('../models/Hikes')
const data = require('./seeds.json')

Hike.remove()
    .then(() => {
      return Hike.collection.insert(data)
    })
    .then(() => {
      process.exit()
    })
