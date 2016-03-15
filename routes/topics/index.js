var express = require('express'),
	router = express.Router(),
	async = require('async'),
	_ = require('underscore'),
	Firebase = require("firebase"),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	topicsRef = new Firebase("https://peerngineer.firebaseio.com/topics")

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
			topicsRef.on('value', function(snapshot) {
				//get topics
				viewObj.topics = snapshot.val();
				cb();
			});
		}
	], function(err) {
		if(err) throw err;
		console.log(viewObj.topics);
		res.render('topics', viewObj);
	});
});

module.exports = router;
