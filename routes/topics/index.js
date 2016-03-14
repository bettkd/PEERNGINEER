var express = require('express'),
	router = express.Router(),
	async = require('async'),
	_ = require('underscore'),
	Firebase = require("firebase"),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	topicsRef = new Firebase("https://peerngineer.firebaseio.com/topics"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Topics | PEERNGINEER',
	user: false
}

router.get('/', function(req, res) {
	async.series([
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
			topicRef.orderByChild('category').on('value', function(snapshot) {
				//get topics
				viewObj.topics = snapshot.val();
				cb();
			});
		}
	], function(err) {
		if(err) throw err;

		viewObj.singleTopic = false;
		res.render('topics', viewObj);
	});
});

router.get('/:shortname', function(req, res) {
	async.series([
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
				cb();
			});
		}
	], function(err) {
		if(err) throw err;

		viewObj.singleTopic = true;
		res.render('topics', viewObj);
	});
});

module.exports = router;
