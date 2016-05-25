'use strict';

var router = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

router.get('/me', function (req, res, next) {
	res.json(req.user)
});

router.get('/google', passport.authenticate('google', { scope : 'email' })); // route for when user clicks on "sign in through Google"; "scope" here is permission scope (not angular) for what we are allowed to access from user info

router.get('/google/callback',  // route for Google to redirect user back to our site after authenticated
	passport.authenticate('google', {
		failureRedirect : '/login' // or wherever
	}),
	function(req, res, next) {
		res.redirect('/users/'+req.user.id)
	}
);

// this happens only upon signin
passport.serializeUser(function(user, done) {
	done(null, user.id); // this attaches user.id to the session
});

// this happens on every request during the user's current session
passport.deserializeUser(function (id, done) {
	User.findById(id).then(function (user) {
		done(null, user); // this assigns req.user property to the session
	}).catch(done);
});

passport.use(
  new GoogleStrategy({
    clientID: '508245289964-5s00qt5u4j0loc977jt5odb6j90su3ro.apps.googleusercontent.com',
    clientSecret: 'dUmHkqZmT9coaiYnh05SKRzV',
    callbackURL: '/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    var info = {
	  name: profile.displayName,
	  email: profile.emails[0].value,
	  photo: profile.photos ? profile.photos[0].value : undefined
	};

	User.findOrCreate({
	  where: {googleId: profile.id},
	  defaults: info
	})
	.spread(function (user) {
	  done(null, user); // this is how the user gets passed along from Google to our backend.
	})
	.catch(done);
  })
);

module.exports = router;
