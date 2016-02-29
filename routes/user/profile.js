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

		var username = authData.password.email.split('@')[0]

		//get user data
		userRef.child(username).once('value', function(snapshot) {
			var exists = (snapshot.val() !== null);
			viewObj.auth = authData;
			if (exists) {
				viewObj.user = snapshot.val();
				return res.render('user/profile', viewObj);
			} else {
				return res.redirect('/user/profile_edit');
			}
			});
	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}
});


// TODO: Allow a way for users to change their password through the route /access/changepasswd if it can be done on a modal form, nice!

module.exports = router;
