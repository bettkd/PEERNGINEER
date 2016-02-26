var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Edit Profile | PEERNGINEER'
};
var newUser, id, username;

router.get('/', function(req, res) {
	
	console.log("here!!!!!");
	// get user data if theya are logged in
	var authData = ref.getAuth();

	if (authData) {

		username = authData.password.email.split('@')[0]

		console.log("authData "+ authData)
		//set auth for view access
		viewObj.auth = authData;

		//get user data
		userRef.child(username).once('value', function(snapshot) {
		    var exists = (snapshot.val() !== null);
		    console.log("EXISTANCE: " + exists);
		    if (exists) {
		    	viewObj.user = snapshot.val();
		    	newUser = "false";
		    	viewObj.isNew = "false";
		    } else {
		    	newUser = "true";
		    	viewObj.isNew = "true";
		    }
		});

		console.log("new ???? " + newUser);
		return res.render('user/profile_edit', viewObj)

	} else {
		return res.redirect('/access/login');
	}
});

router.post('/', function(req, res) {

	//get user data from req
	var userData = {
		uid: req.body._id,
		isAdmin: false,
		isMentor: false,
		isMentee: true,
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
		classification: req.body.classification,
		availability: {
			"monday": req.body["monday-times"] || [],
			"tuesday": req.body["tuesday-times"] || [],
			"wednesday": req.body["wednesday-times"] || [],
			"thursday": req.body["thursday-times"] || [],
			"friday": req.body["friday-times"] || []
		}
	}

	//set userRef
	var userRef = ref.child('users');

	if(newUser) {
		console.log("New User added!")
		userRef.child(username).set(userData);
		res.redirect('/user/profile');
	} else {
		console.log("Old User updated!")
		userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + id );
		userRef.update(userData, function(err) {
			if(err) throw err;

			res.redirect('/user/profile');
		})
	}
});

module.exports = router;
