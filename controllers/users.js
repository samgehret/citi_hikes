const express = require('express')
const router = express.Router()
var bodyParser = require('body-parser')
// var methodOverride = require('method-override')
var passport = require('passport')

router.get('/login', (req, res) => {
  res.render('users/login')
})

router.get('/signup', (req, res) => {
  res.render('users/signup', { message: req.flash('signupMessage') })
})

// POST Signup
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

module.exports = router
