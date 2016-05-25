'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('./users/user.model');
var Story = require('./stories/story.model');

router.post('/', function (req, res, next) {
  User.create(req.body)
  .then(function (user) {
    req.session.userId = user.id;
    res.json(user);
  })
  .catch(next)
});

module.exports = router;
