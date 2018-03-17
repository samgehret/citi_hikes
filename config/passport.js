const LocalStrategy = require('passport-local').Strategy
const User = require('../models/Users')

// Used a lot of the code from the GA lesson.

module.exports = function (passport) {
  passport.serializeUser(function (user, callback) {
    callback(null, user.id)
  })

  passport.deserializeUser(function (id, callback) {
    User.findById(id, function (err, user) {
      callback(err, user)
    })
  })
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },

   function (req, email, password, callback) {
     User.findOne({ 'local.email': email }, function (err, user) {
       if (err) return callback(err)

       if (user) {
         console.log('user taken')
         return callback(null, false, req.flash('signupMessage', 'Email already exists'))
       } else {
         var newUser = new User()
         newUser.local.email = email
         newUser.local.password = newUser.encrypt(password)
         newUser.isAdmin = false
         newUser.favoriteHikes = []
         // by default I set isAdmin to false. User can only become admin
         // with direct DB access to modify the property manually

         newUser.save(function (err) {
           if (err) throw err
           return callback(null, newUser)
         })
       }
     })
   }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, callback) {
    User.findOne({'local.email': email}, function (err, user) {
      if (err) return callback(err)

      if (!user) {
        return callback(null, false, req.flash('loginMessage', 'No user found for this email'))
      }
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('loginMessage', 'Invaild Password'))
      }
      return callback(null, user)
    })
  }))
}
