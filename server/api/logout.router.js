'use strict';

var router = require('express').Router();
var HttpError = require('../utils/HttpError');

router.get('/', function (req, res, next) {
  req.session.destroy();
  console.log('User logged out req.session: ',req.session);
  res.send(204);
});

module.exports = router;
