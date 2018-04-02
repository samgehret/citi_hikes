const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const Hike = require('../models/Hikes')
var hikeID = ''

var url = `https://www.hikingproject.com/data/get-trails-by-id?ids=${hikeID}&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1`

router.get('/', (req, res) => {
  console.log(req.session)
  Hike.find({})
        .then(hikes => {
          res.render('hikes/list')
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
  console.log('hello')
  Hike.findOne({'hiker': `${req.params.id}`})
    .then(hike => {
      console.log(hike)
      hike.hikeComments.push({
        commentText: req.body.hikeComment,
        commentor: req.user.local.email,
        dateComment: Date.now()
      })
      hike.save()
      console.log('the id is' + req.params.id)
      res.redirect('/hikes/' + req.params.id)
    })
})

// Only users who posted the hike can edit or delete their own hike
// isMyHike will be set to true if you are looking at the show page of
// your own hike.
router.get('/:id', (req, res) => {
  hikeID = req.params.id
  Hike.findOne({ 'hiker': `${req.params.id}`})
        .then(hike => {
          if (hike === null) {
            fetch(`https://www.hikingproject.com/data/get-trails-by-id?ids=${req.params.id}&key=200230209-ca9b0a0f9bb083f7f5ee4ddc59a95de1`)
              .then((response) => {
                return response.json()
              })
              .then((response) => {
                // console.log(res.trails[0].id)
                Hike.create({
                  'hiker': response.trails[0].id,
                  'hikeNum': response.trails[0].id,
                  'hikeComments': []
                })
                res.render('hikes/show', {hikeID})
              })
              .catch((err) => {
                console.log('something went wrong...', err)
              })
          } else {
            // console.log('hike found')
          // this sorts the comments by most recent
            var sortedComments = hike.hikeComments
            sortedComments.sort(function (a, b) {
              return b.dateComment - a.dateComment
            })
            res.render('hikes/show', {hikeID, hike})
          }
          // console.log('got here')
          // res.render('hikes/show', {hikeID, hike})
        })

  // res.render('hikes/show', {hikeID, sortedComments})
})

router.delete('/:id', (req, res) => {
  Hike.findOneAndRemove({_id: req.params.id})
    .then(() => {
      res.redirect('/users/' + req.params.id)
    })
})

module.exports = router
