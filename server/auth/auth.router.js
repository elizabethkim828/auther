'use strict';

var router = require('express').Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/users/user.model');

router.get('/me', function (req, res, next) {
  res.json(req.session.user || req.user);
});

router.get('/google', passport.authenticate('google', { scope : 'email' }));

router.get('/google/callback',
	passport.authenticate('google', {
		failureRedirect : '/' // or wherever
	}),
	function(req, res, next) {
		var id = req.user.id
		res.redirect('/users/'+id)
	}
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id).then(function (user) {
		done(null, user);
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
	  done(null, user);
	})
	.catch(done);
  })
);

module.exports = router;
