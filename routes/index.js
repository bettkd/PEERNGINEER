var express = require('express');
var router = express.Router();
var Firebase = require("firebase");

var title = "Peerngineer Program"

//Firebase backend
var ref = new Firebase("https://peerngineer.firebaseio.com");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: title });
});

// MARK : Login Existing User
router.post('/', function(req, res){
  var email = req.body.email;
  var password = req.body.password
	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    res.render('index', { err_message: error, title: title })
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
		res.render('index', { err_message: "Error: Login with your Claflin email.", title: title })
	}
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: title });
});


// MARK : Register New User
router.post('/register', function(req, res){
  var email = req.body._email;
  var password = req.body._password
  var confirmpassword = req.body.c_password
  console.log(email)
	// Create a callback to handle the result of the authentication
	function authHandler(error, authData) {
	  if (error) {
	    console.log("Login Failed!", error);
	    res.render('index', { _err_message: error, title: title })
	  } else {
	    console.log("Authenticated successfully with payload:", authData);
	    res.redirect("/users")
	  }
	}
	if (email.indexOf("@claflin.edu") < 0) {
		res.render('index', { _err_message: "Error: Register with your Claflin email.", title: title })
	} else if (password != confirmpassword){
		res.render('index', { _err_message: "Error: Paswords do not match.", title: title })
	} else {
		ref.createUser({
			email: email,
			password: password,
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        break;
		      default:
		        console.log("Error creating user:", error);
		    }
		    res.render('index', { _err_message: error, title: title })
		  } else {
		    console.log("Successfully created user account with uid:", userData.uid);
		    res.redirect("/users")
		  }
		});
	}
});

module.exports = router;
