var express = require('express'),
	router = express.Router(),
	Firebase = require("firebase"),
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Home | PEERNGINEER',
	user: false
}

/* GET home page. */
router.get('/', function(req, res, next) {

	// check if user is logged in
	// redirect if true
	if(ref.getAuth()) {
		viewObj.user = true;
		return res.render('index', viewObj);
	}

	// user logged out
	if(req.query.u === 'false') {
		viewObj.user = false;
		return res.render('index', viewObj);
	}

	res.render('index', viewObj);
});


module.exports = router;
