'use strict';

var router = require('express').Router();
var HttpError = require('../utils/HttpError');

router.get('/', function (req, res, next) {
  req.session.destroy();
  res.send(204);
});

module.exports = router;
