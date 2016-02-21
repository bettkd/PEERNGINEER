var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com");


var viewObj = {
	title: 'Register | PEERNGINEER'
}

router.get('/', function(req, res, next) {
	viewObj.err = null;
	viewObj.email = null;
	res.render('register', viewObj);
});


// MARK : Register New User
router.post('/', function(req, res){
	var email = req.body.email;
	var password = req.body.password
	var confirmpassword = req.body.c_password
	console.log(email)
	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			viewObj.err = error
			res.render('register', viewObj)
		} else {
			console.log("Authenticated successfully with payload:", authData);
			res.redirect("/users")
		}
	}

	function handleError(error) {
		viewObj.err = error
		viewObj.email = email
		res.render('register', viewObj)
	}

	if (email.indexOf("@claflin.edu") < 0) {
		handleError("Error: Register with your Claflin email.");
	} else if (password != confirmpassword){
		handleError("Error: Paswords do not match.");
	} else if (password.length < 6) {
		handleError("Error: Paswords is too short.");
	} else {
		ref.createUser({
			email: email,
			password: password,
		}, function(error, userData) {
			if (error) {
				switch (error.code) {
					case "EMAIL_TAKEN":
						handleError("The new user account cannot be created because the email is already in use.");
						break;
					case "INVALID_EMAIL":
						handleError("The specified email is not a valid email.");
						break;
					default:
						handleError("Error creating user account.");
						console.log("Error creating user:", error);
				}
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
				res.redirect("/users")
			}
		});
	}
});

module.exports = router;
