var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Profile | PEERNGINEER'
}

router.get('/', function(req, res) {
	utils.authRedir(req, res, 'user/profile', viewObj);
});


// TODO: Allow a way for users to change their password through the route /access/changepasswd if it can be done on a modal form, nice!
router.post('/changepasswd', function(req, res) {

});

module.exports = router;
