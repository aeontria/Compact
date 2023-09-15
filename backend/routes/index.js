var express = require('express');
var router = express.Router();
var path = require('path');

// Default Route //
var accessController = require('../controllers/accessController');
var redemptionController = require('../controllers/redemptionController');
// var storeController = require('../controllers/storeController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PT. AEON INDONESIA' });
});

router.use('/access', accessController);
router.use('/redemption', redemptionController);
// router.use('/store', storeController);

module.exports = router;