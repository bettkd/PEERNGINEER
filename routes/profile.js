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
		viewObj.firstname = "FNAME";
		viewObj.lastname = "LNAME";
		viewObj.bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sem tortor, aliquam viverra commodo nec, semper at leo. Phasellus fringilla porttitor arcu, a sollicitudin enim euismod ac. Nulla elementum mi vel elit consectetur, ac ultrices quam hendrerit. Nulla mattis mollis ex ut eleifend. Lorem ipsum dolor sit amet, consectetur adipiscing.";
		viewObj.phone = "+1 (803) 000-0000";
		viewObj.linkedinID = "none";
		viewObj.facebookID = "none";
		viewObj.githubID = "none";
		viewObj.major = "Computer Science";
		viewObj.classification = "Junior";
		viewObj.interestedtopics = ["Java", "HTML/CSS", "Javascript"];
		viewObj.mentortopics = null;
		viewObj.availability = ["MW10p-11.30p", "MF4.30p-6p", "TR12.30p-1.15p"]

		console.log("Image url:", authData.password.profileImageURL);
		res.render('profile', viewObj)
	} else {
		console.log("User not authenticated");
		return res.redirect('/login');
	}
	;
});



module.exports = router;