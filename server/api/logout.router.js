'use strict';

var router = require('express').Router();
var HttpError = require('../utils/HttpError');

router.get('/', function (req, res, next) {
  req.logout(); // this deletes the userID from the req.session (probably like req.session.passport.userid)
  res.send(204);
});

module.exports = router;
