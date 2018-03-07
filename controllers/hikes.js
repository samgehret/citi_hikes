const express = require('express')
const router = express.Router()

const Hike = require('../models/Hikes')

router.get('/', (req, res) => {
  // console.log(currentUser.local.email)
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

router.get('/new', (req, res) => {
  console.log(req.user)
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

router.put('/:id', (req, res) => {
  console.log('POSTING TO EDITING HIKE!!!!!')
  Hike.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        .then(hike => {
          res.redirect('/hikes/' + req.params.id)
        })
})

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

router.get('/:id', (req, res) => {
  Hike.findOne({ _id: req.params.id })
        .then(hike => {
          var isMyHike = false
          if (req.user) {
            if (req.user.id === hike.authorID) {
              isMyHike = true
            }
          }
          console.log(isMyHike)
          // if (hike.authorID === req.user.id) {
          //   console.log('this is my hike')
          // }
          // console.log(hike.authorID)
          // console.log(req.user.id)
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
