var express = require('express'),
	router = express.Router(),
	async = require('async'),
	_ = require('underscore'),
	Firebase = require("firebase"),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	topicsRef = new Firebase("https://peerngineer.firebaseio.com/topics"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Topic | PEERNGINEER',
	user: false
}

router.get('/:shortname', function(req, res) {
	async.series([
		//check if user signed in
		//and if admin
		function(cb) {
			if(utils.getUname()) {
				userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + utils.getUname());
				userRef.on('value', function(snapshot) {
					viewObj.user = snapshot.val();
					cb();
				})
			} else {
				cb();
			}
		},
		//get user data
		function(cb) {
			userRef.on('value', function(snapshot) {
				//get all users
				viewObj.users = snapshot.val();
				cb();
			})
		},
		//get topics
		function(cb) {
			topicRef = new Firebase("https://peerngineer.firebaseio.com/topics/" + req.params.shortname);

			topicRef.on('value', function(snapshot) {
				//get topic
				viewObj.topic = snapshot.val();
				viewObj.title = viewObj.topic.name + " | PEERNGINEER";
				cb();
			});
		}
	], function(err) {
		if(err) throw err;

		res.render('topics/topic', viewObj);
	});
});

module.exports = router;
