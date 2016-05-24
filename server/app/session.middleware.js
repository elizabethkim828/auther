'use strict';

var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({ secret: 'tongiscool' })); // this mandatory configuration ensures that session IDs are not predictable (replace tongiscool with whatever)

router.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

module.exports = router;
