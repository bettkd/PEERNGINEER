var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');

router.get('/', function(req, res) {
	res.render('login');
});

module.exports = router;
