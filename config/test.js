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

  