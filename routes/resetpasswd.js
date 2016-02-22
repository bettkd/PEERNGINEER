var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

var viewObj = {
	title: 'Reset Password | PEERNGINEER'
}

router.get('/', function(req, res) {
	viewObj.err = null;
	viewObj.email = null;
	res.render('resetpasswd', viewObj);
});

router.post('/', function(req, res){
	var email = req.body.email;
	ref.resetPassword({
		email : email
	}, function(error) {
		if (error === null) {
			console.log("Password reset email sent successfully");
			res.redirect("/login")
		} else {
			console.log("Error sending password reset email:", error);
			viewObj.err = error;
			viewObj.email = email;
			res.render('resetpasswd', viewObj)
		}
	});
});

module.exports = router;
