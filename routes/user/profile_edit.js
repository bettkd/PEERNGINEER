var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Edit Profile | PEERNGINEER'
}

router.get('/', function(req, res) {
	// get user data if theya are logged in
	var authData = ref.getAuth();

	if (authData) {
		viewObj.user = authData;
		console.log(authData);
		res.render('user/profile_edit', viewObj)
	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}
	if(req.query) {
		viewObj.isNew = req.query.isNew;
	}
});



module.exports = router;
