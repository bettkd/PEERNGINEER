var express = require('express'),
	router = express.Router(),
	async = require('async');
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users"),
	topicRef = new Firebase("https://peerngineer.firebaseio.com/topics");

var viewObj = {
	title: 'Edit Profile | PEERNGINEER'
};
var newUser, username, gravatar;

router.get('/', function(req, res) {
	// get user data if theya are logged in
	var authData = ref.getAuth();
	viewObj.auth = authData;
	console.log(authData);

	if (authData) {
		async.parallel([
			//get user data
			function(cb) {
				userRef.child(utils.getUname()).once('value', function(snapshot) {
					var exists = (snapshot.val() !== null);

					if (exists) {
						viewObj.user = snapshot.val();
						viewObj.isNew = "false";
					} else {
						viewObj.isNew = "true";
					}

					cb();
				});
			},
			//get topics
			function(cb) {
				topicRef.on('value', function(snapshot) {
					viewObj.topics = snapshot.val();
					cb();
				});
			}
		], function(err) {
			if(err) throw err;

			res.render('user/profile_edit', viewObj)
		});

	} else {
		res.redirect('/access/login');
	}
});

router.post('/', function(req, res) {

	var authData = ref.getAuth();

	//get user data from req
	var userData = {
		uid: authData.uid,
		isMentee: true,
		username: req.body.username,
		first : req.body.firstname,
		last : req.body.lastname,
		fullname : [req.body.firstname, req.body.lastname].join(' '),
		email: authData.password.email,
		//password: authData
		bio : req.body.bio,
		contact : {
			phone : req.body.phone,
			githubID : req.body.githubID,
			linkedinID : req.body.linkedinID,
			facebookID : req.body.facebookID,
		},
		major: req.body.major,
		classification: req.body.classification,
		topics: req.body.topic,
		availability: {
			"monday": req.body["monday-times"] || [],
			"tuesday": req.body["tuesday-times"] || [],
			"wednesday": req.body["wednesday-times"] || [],
			"thursday": req.body["thursday-times"] || [],
			"friday": req.body["friday-times"] || []
		}
	}

	//set userRef
	userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + req.body.username );
	userRef.update(userData, function(err) {
		if(err) throw err;

		res.redirect('/user/profile');
	})
});

module.exports = router;
