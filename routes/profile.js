var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Login | PEERNGINEER'
}

router.get('/', function(req, res) {
	viewObj.err = null;
	viewObj.email = null;
	res.render('login', viewObj);
});



module.exports = router;