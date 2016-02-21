var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Login | PEERNGINEER'
}

router.get('/', function(req, res) {
	// check if user is logged in
	// redirect if true
	if(ref.getAuth()) {
		return res.redirect('/users');
	}

	viewObj.err = null;
	viewObj.email = null;
	res.render('login', viewObj);
});

// MARK : Login Existing User
router.post('/', function(req, res){
	var email = req.body.email;
	var password = req.body.password

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			viewObj.err = error;
			viewObj.email = email;
			res.render('login', viewObj)
		} else {
			console.log("Authenticated successfully with payload:", authData);
			res.redirect("/")
	 	}
	}

	if (email.indexOf("@claflin.edu") > -1) {
		ref.authWithPassword({
			email    : email,
			password : password
		}, authHandler);
	} else {
		viewObj.err = "Error: Login with your Claflin email.";
		viewObj.email = email;
		res.render('login', viewObj)
	}
});

module.exports = router;
