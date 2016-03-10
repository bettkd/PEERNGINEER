var _ = require('underscore'),
	async = require('async'),
	express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users"),
	topicRef = new Firebase("https://peerngineer.firebaseio.com/topics"),
	viewObj = {
		title: "Mentor | PEERNGINEER"
	};

router.get('/', function(req, res) {
	var auth = ref.getAuth();

	if(auth) {
		async.parallel([
			//get user data
			function(cb) {
				userRef.child(utils.getUname()).once('value', function(snapshot) {
					viewObj.user = snapshot.val();
					cb();
				})
			},
			//get topics
			function(cb) {
				topicRef.on('value', function(snapshot) {
					viewObj.topics = snapshot.val();
					cb();
				});
			}
		], function(err) {
			if(err) throw err;

			res.render('user/admin/mentor', viewObj);
		});

	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}
});

module.exports = router;
