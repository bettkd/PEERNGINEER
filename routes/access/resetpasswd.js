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
	res.render('access/resetpasswd', viewObj);
});

router.post('/', function(req, res){
	var email = req.body.email;
	ref.resetPassword({
		email : email
	}, function(error) {
		if (error === null) {
			console.log("Password reset email sent successfully");
			res.redirect("/access/login?reset=true")
		} else {
			console.log("Error sending password reset email:", error);
			viewObj.err = error;
			viewObj.email = email;
			res.render('access/resetpasswd', viewObj)
		}
	});
});

module.exports = router;
