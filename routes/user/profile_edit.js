var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Edit Profile | PEERNGINEER'
};
var query, id;

router.get('/', function(req, res) {
	if(req.query) {
		query = req.query;
		viewObj.isNew = req.query.isNew;
	}

	// get user data if theya are logged in
	var authData = ref.getAuth();

	if (authData) {
		//set auth for view access
		viewObj.auth = authData;

		//get user data
		userRef.orderByChild("_id").equalTo(authData.uid).on("child_added", function(snapshot) {
			id = snapshot.key();
			viewObj.user = snapshot.val();console.log(snapshot.val());
		}, function (errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	} else {
		return res.redirect('/access/login');
	}

	res.render('user/profile_edit', viewObj)
});

router.post('/', function(req, res) {

	console.log(req.body);

	//get user data from req
	var userData = {
		_id: req.body._id,
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

	if(query.isNew === 'true') {
		userRef.push().set(userData, function(err) {
			if(err) throw err;

			res.redirect('/user/profile');
		});
	} else {
		userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + id );
		userRef.update(userData, function(err) {
			if(err) throw err;

			res.redirect('/user/profile');
		})
	}
});

module.exports = router;
