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
    author: req.user.local.email,
    authorID: req.user.id,
    drivingDistance: req.body.drivingDistance,
    hikeDuration: req.body.hikeDuration,
    hikeDifficulty: req.body.hikeDifficulty,
    hikeSummary: req.body.hikeSummary,
    hikeDetail: req.body.hikeDetail
  })
    .then(hike => {
      res.redirect('/hikes')
    })
})

// Only logged in users can post a hike and access the /new view
router.get('/new', (req, res) => {
  if (req.user) {
    res.render('hikes/new')
  } else {
    res.redirect('/users/signup')
  }
})

router.get('/edit/:id', (req, res) => {
  Hike.findOne({_id: req.params.id})
    .then(hike => {
      res.render('hikes/edit', hike)
    })
})

// Edit a hike route
router.put('/:id', (req, res) => {
  Hike.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(hike => {
          res.redirect('/hikes/' + req.params.id)
        })
})

// This route is to POST a new comment, which pushes it to a comment array
// property of a hike.
router.post('/:id', (req, res) => {
  Hike.findOne({_id: req.params.id})
    .then(hike => {
      hike.hikeComments.push({
        commentText: req.body.hikeComment,
        commentor: req.user.local.email,
        dateComment: Date.now()
      })
      hike.save()
      res.redirect('/hikes/' + req.params.id)
    })
})

// Only users who posted the hike can edit or delete their own hike
// isMyHike will be set to true if you are looking at the show page of
// your own hike.
router.get('/:id', (req, res) => {
  Hike.findOne({ _id: req.params.id })
        .then(hike => {
          var isMyHike = false
          if (req.user) {
            if (req.user.id === hike.authorID) {
              isMyHike = true
            }
          }
          // this sorts the comments by most recent
          var sortedComments = hike.hikeComments
          sortedComments.sort(function (a, b) {
            return b.dateComment - a.dateComment
          })
          res.render('hikes/show', { hike, sortedComments, isMyHike })
        })
})

router.delete('/:id', (req, res) => {
  Hike.findOneAndRemove({_id: req.params.id})
    .then(() => {
      res.redirect('/users/' + req.params.id)
    })
})

module.exports = router
