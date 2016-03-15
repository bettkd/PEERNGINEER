var Firebase = require('firebase'),
	async = require('async'),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

module.exports = utils = {

	// METHOD: checks if user is logged in
	// if they are logged in it loads route
	// and returns user data. Otherwise we
	// redirect to login page.
	authRedir : function(req, res, route, viewObj) {
		viewObj = viewObj || {};

		if(utils.getUname()) {
			viewObj.auth = ref.getAuth();
			userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + utils.getUname());
			userRef.on('value', function(snapshot) {
				if(snapshot.val() !== null) {
					viewObj.user = snapshot.val();
					res.render(route, viewObj);
				} else {
					res.redirect('/user/profile_edit?isNew=true');
				}

			});
		} else {
			res.redirect('/access/login');
		}
	},
	//METHOD: generates random string of defined length
	ranStr : function(length) {
		var dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
			result = "";

		for(var i = 0; i <= length; i++) {
			result+= dict.charAt(Math.floor(Math.random() * dict.length));
		}

		return result;
	},
	//METHOD: parses username from email
	getUname : function() {
		if(ref.getAuth()) {
			return ref.getAuth().password.email.split('@')[0];
		} else {
			return false;
		}
	}
}
