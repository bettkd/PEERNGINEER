var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Edit Profile | PEERNGINEER'
}

router.get('/', function(req, res) {
	if(req.query) {
		viewObj.isNew = req.query.isNew;
	}

	// get user data if theya are logged in
	var authData = ref.getAuth();

	if (authData) {
		//set auth for view access
		viewObj.auth = authData;

		//get user data
		userRef.orderByChild("_id").equalTo(authData.uid).on("child_added", function(snapshot) {
			console.log(snapshot.val());
			viewObj.user = snapshot.val();
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}

	res.render('user/profile_edit', viewObj)
});

router.post('/', function(req, res) {
	var username = req.body.username;
	//setup data for saving
	var userRef = ref.child('users');
	userRef.push().set({
			_id: req.body._id,
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
			major: req.body.major,
			classification: req.body.classification
	}, function(err) {
		if(err) throw err;

		console.log('Saved data.');
		res.redirect('/user/profile');
	})
});

module.exports = router;
