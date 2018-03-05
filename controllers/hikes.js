const express = require('express')
const router = express.Router()

const Hike = require('../models/Hikes')

router.get('/', (req, res) => {
  console.log('getting to hike!!!!!')
  Hike.find({})
        .then(hikes => {
          res.render('hikes/list', {hikes})
        })
})

module.exports = router
