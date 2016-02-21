var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

router.get('/', function(req, res) {
	res.render('login', {
		title: 'Login'
	});
});

// MARK : Login Existing User
router.post('/', function(req, res){
	var email = req.body.email;
	var password = req.body.password

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			res.render('login', { err_message: error, title: 'title' })
		} else {
			console.log("Authenticated successfully with payload:", authData);
			res.redirect("/users")
	 	}
	}

	if (email.indexOf("@claflin.edu") > -1) {
		ref.authWithPassword({
			email    : email,
			password : password
		}, authHandler);
	} else {
		res.render('login', { err_message: "Error: Login with your Claflin email.", title: 'title' })
	}
});

module.exports = router;
