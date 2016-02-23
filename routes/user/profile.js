var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Profile | PEERNGINEER'
}

router.get('/', function(req, res) {
	// get user data if theya are logged in
	var authData = ref.getAuth();
	if (authData) {

		res.render('user/profile', viewObj)
	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}
	;
});


// TODO: Allow a way for users to change their password through the route /access/changepasswd if it can be done on a modal form, nice!

module.exports = router;
