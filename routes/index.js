var express = require('express');
var router = express.Router();
var Firebase = require("firebase");

var title = "Peerngineer Program"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});


module.exports = router;
