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

router.post('/', function(req, res) {
	var username = req.body.username;
	//setup data for saving
	var userRef = ref.child('users');
	userRef.push().set({
			username: req.body.username,
			first : req.body.firstname,
			last : req.body.lastname,
			fullname : [req.body.firstname, req.body.lastname].join(' '),
			email: req.body.email,
			bio : req.body.bio,
			phone : req.body.phone,
			githubID : req.body.githubID,
			linkedinID : req.body.linkedinID,
			facebookID : req.body.facebookID,
			major: req.body.major
	}, function(err) {
		if(err) throw err;

		console.log('Saved data.');
		res.redirect('/user/profile');
	})
});

module.exports = router;
