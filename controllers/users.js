const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
var passport = require('passport')

const User = require('../models/Users')
const Hike = require('../models/Hikes')

router.get('/login', (req, res) => {
  res.render('users/login', { message: req.flash('loginMessage') })
})

router.get('/signup', (req, res) => {
  res.render('users/signup', { message: req.flash('signupMessage') })
})

// Only admin users can access the list users page
router.get('/', (req, res) => {
  if (req.user && req.user.isAdmin) {
    User.find({})
        .then(users => {
          res.render('users/list', {users})
        })
  } else {
    res.send('no access')
  }
})

router.post('/signup', (req, res) => {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/hikes',
    failureRedirect: '/users/signup',
    failureFlash: true
  })
  return signupStrategy(req, res)
})

router.post('/login', (req, res) => {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/hikes',
    failureRedirect: '/users/login',
    failureFlash: true
  })
  return loginProperty(req, res)
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/hikes')
})

// will edit this to return favorite hikes instead of POSTed hikes
router.get('/:id', (req, res) => {
  User.findOne({_id: req.params.id})
    .then(user => {
      res.render('users/profile', {user})
    })
})

// Push a favorite hike to array
router.post('/:id', (req, res) => {
  console.log('hello')
  User.findOne({_id: req.user.id})
    .then(user => {
      console.log(user)
      user.favoriteHikes.push({
        hikeID: req.body.hikeid,
        hikeTitle: req.body.hikeTitle
      })
      user.save()
      console.log('the id is' + req.body.hikeid)
      res.redirect('/hikes/' + req.body.hikeid)
    })
})

router.delete('/:id', (req, res) => {
  User.findOneAndRemove({_id: req.params.id})
    .then(() => {
      res.redirect('/users')
    })
})

module.exports = router
