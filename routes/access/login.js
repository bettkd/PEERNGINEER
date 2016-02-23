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
		return res.redirect('/user/profile');
	}

	viewObj.err = null;
	viewObj.email = null;
	viewObj.newUser = null;
	if (req.query.isNew){
		viewObj.newUser = true;
	}
	console.log(viewObj.new)
	res.render('access/login', viewObj);
});

// MARK : Login Existing User
router.post('/', function(req, res){
	var email = req.body.email;
	var password = req.body.password

	viewObj.newUser = null;

	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
			viewObj.err = error;
			viewObj.email = email;
			res.render('access/login', viewObj)
		} else {
			console.log("Authenticated successfully with payload:", authData);
			res.redirect("/user/profile")
	 	}
	}

	if(email.indexOf('@') === -1)
	{
		email = email.concat("@claflin.edu");
	}

	if (email.indexOf("@claflin.edu") > -1) {
		ref.authWithPassword({
			email    : email,
			password : password
		}, authHandler);
	} else {
		viewObj.err = "Error: Login with your Claflin email.";
		viewObj.email = email;
		res.render('access/login', viewObj)
	}
});

module.exports = router;