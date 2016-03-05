var Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

module.exports = utils = {

	// METHOD: checks if user is logged in
	// if they are logged in it loads route
	// and returns user data. Otherwise we
	// redirect to login page.
	authRedir : function(req, res, route, viewObj) {
		viewObj = viewObj || {};

		var authData = ref.getAuth();
		if (authData) {
			// get user data if they are logged in
			var username = authData.password.email.split('@')[0];
			//get user data
			userRef.child(username).once('value', function(snapshot) {
				var exists = (snapshot.val() !== null);
				viewObj.auth = authData;
				if (exists) {
					viewObj.user = snapshot.val();
					return res.render(route, viewObj);
				} else {
					return res.redirect('/user/profile_edit?isNew=true');
				}
				});
		} else {
			console.log("User not authenticated");
			return res.redirect('/access/login');
		}
	},
	ranStr : function(length) {
		var dict = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
			result = "";

		for(var i = 0; i <= length; i++) {
			result+= dict.charAt(Math.floor(Math.random() * dict.length));
		}

		return result;
	}
}
