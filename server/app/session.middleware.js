'use strict';

var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({ secret: 'tongiscool' })); // this mandatory configuration ensures that session IDs are not predictable (replace tongiscool with whatever)

router.use('/', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  req.session.cookie.maxAge = 600000; //10 minutes
  req.session.cookie.rolling = true;
  console.log(req.session)
  next();
});

module.exports = router;
