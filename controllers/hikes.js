const express = require('express')
const router = express.Router()

const Hike = require('../models/Hikes')

router.get('/', (req, res) => {
  Hike.find({})
        .then(hikes => {
          res.render('hikes/list', { hikes })
        })
})

router.post('/', (req, res) => {
  Hike.create({
    hikeTitle: req.body.hikeTitle,
    datePosted: Date.now(),
    author: req.body.author,
    drivingDistance: req.body.drivingDistance,
    hikeDuration: req.body.hikeDuration,
    hikeDifficulty: req.body.hikeDifficulty,
    hikeContent: req.body.hikeContent
  })
    .then(hike => {
      res.redirect('/hikes')
    })
})

router.get('/new', (req, res) => {
  console.log('NEW HIKE!!!!!')
  res.render('hikes/new')
})

router.get('/:id', (req, res) => {
  Hike.findOne({ _id: req.params.id })
        .then(hike => {
          res.render('hikes/show', { hike })
        })
})

module.exports = router
