var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

router.get('/', function(req, res, next) {
	ref.unauth();
	res.redirect('/?u=false');
});

module.exports = router;
