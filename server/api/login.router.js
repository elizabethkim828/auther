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
      // triggers serialization via passport
      req.login(user, function(err) {
        if (err) next();
        else res.json(user);
      })
    }
  })
  .catch(next);
});

module.exports = router;
