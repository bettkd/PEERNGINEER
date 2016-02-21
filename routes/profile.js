var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Profile | PEERNGINEER'
}

router.get('/', function(req, res) {
	// get user data if theya are logged in
	var authData = ref.getAuth();
	if (authData) {
		console.log("Authenticated user with uid:", authData.uid);
		console.log("Authenticated user with email:", authData.password.email);
		var email = authData.password.email;
		viewObj.email = email
		viewObj.username = email.substring(0, email.lastIndexOf("@"));
		viewObj.profileImageURL = authData.password.profileImageURL;

		console.log("Image url:", authData.password.profileImageURL);
		res.render('profile', viewObj)
	} else {
		console.log("User not authenticated");
		return res.redirect('/login');
	}
	;
});



module.exports = router;