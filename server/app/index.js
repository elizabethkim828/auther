'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');

app.use(require('./logging.middleware'));

app.use(require('./session.middleware'));

app.use(passport.initialize()); // this adds things to the req object such as req.login, etc.
app.use(passport.session()); // this is where deserialization occurs and req.user gets defined

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));
app.use('/auth', require('../auth/auth.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
