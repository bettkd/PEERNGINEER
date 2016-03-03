var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Admin | PEERNGINEER'
};

/* GET users listing. */
router.get('/', function(req, res, next) {

	utils.authRedir(req, res, 'user/admin', viewObj);

});

module.exports = router;
