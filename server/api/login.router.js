'use strict';

var router = require('express').Router();

var HttpError = require('../utils/HttpError');
var User = require('./users/user.model');

router.post('/', function (req, res, next) {
  console.log('in login router');
  console.log(req.body);
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.json(user);
    }
  })
  .catch(next);
});

module.exports = router;
