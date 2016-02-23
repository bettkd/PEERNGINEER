var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com");


var viewObj = {
	title: 'Change Password | PEERNGINEER'
}

router.get('/', function(req, res, next) {
	// check if user is logged in
	// redirect if true
	if(ref.getAuth()) {
		viewObj.err = null;
		viewObj.password = null;
		var email = ref.getAuth().password.email;
		viewObj.email = email;
		viewObj.username = email.substring(0, email.lastIndexOf("@"));
		return res.render('access/changepasswd', viewObj);
	}

	res.redirect('/access/login');
});

// MARK : Change password for user
router.post('/', function(req, res){
	var password = req.body.password;
	var newpassword = req.body.newpassword;
	var confirmpassword = req.body.confirmpassword;

	function handleError(error) {
		viewObj.err = error;
		viewObj.password = null;
		res.render('access/changepasswd', viewObj);
	}

	if (newpassword != confirmpassword) {
		viewObj.err = "Error: Paswords do not match.";
		viewObj.password = password;
		res.render('access/changepasswd', viewObj);
	} if (newpassword.length < 6) {
		viewObj.err = "Error: Paswords is too short.";
		viewObj.password = password;
		res.render('access/changepasswd', viewObj);
	}

	ref.changePassword({
		email: viewObj.email,
		oldPassword: password,
		newPassword: newpassword
	}, function(error) {
		if (error) {
			switch (error.code) {
				case "INVALID_PASSWORD":
					handleError("The specified user account password is incorrect.");
					break;
				case "INVALID_USER":
					handleError("The specified user account does not exist.");
					break;
				default:
					handleError("Error changing password:", error);
			}
		} else {
			res.redirect("/user/profile_edit?isNew=true")
			console.log("User password changed successfully!");
		}
	});
});

module.exports = router;
