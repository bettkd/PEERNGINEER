var express = require('express'),
	router = express.Router(),
	Firebase = require("firebase"),
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Home | PEERNGINEER',
	user: false
}

/* GET home page. */
router.get('/', function(req, res, next) {

	// check if user is logged in
	// redirect if true
	if(ref.getAuth()) {
		viewObj.user = true;
		return res.render('index', viewObj);
	}

	// user logged out
	if(req.query.u === 'false') {
		viewObj.user = false;
		return res.render('index', viewObj);
	}

	res.render('index', viewObj);
});

//handle register post
// MARK : Register New User
router.post('/access/register', function(req, res){

	//grab data from request
	var email = req.body.email;

	// Handle errors in creating account
	function handleError(error) {
		viewObj.err = error
		viewObj.email = email
		res.render('access/register', viewObj)
	}

	if (email.indexOf("@claflin.edu") < 0) {
		handleError("Error: Register with your Claflin email.");
	} else {
		// Create the user
		ref.createUser({
			email: email,
			password: "temporaryPassword"
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
				// reset the user's password -> send them confirmation email -> redirect them to login page
				ref.resetPassword({
					email : email
				}, function(error) {
					if (error === null) {
						console.log("Password reset email sent successfully");
						res.redirect("/access/login?isNew=true")
					} else {
						console.log("Error sending password reset email:", error);
						viewObj.err = error;
						viewObj.email = email;
						res.render('access/resetpasswd', viewObj)
					}
				});
			}
		});
	}
});


module.exports = router;
