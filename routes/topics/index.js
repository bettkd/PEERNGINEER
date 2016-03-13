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

				//get amount of users
				viewObj.userCount = Object.keys(snapshot.val()).length;

				//count mentors
				var countMentors = _.countBy(snapshot.val(), function(obj){
					return obj.isMentor;
				});
				viewObj.mentorCount = countMentors.true || 0;

				//count mentees
				var countMentees = _.countBy(snapshot.val(), function(obj){
					return obj.isMentee;
				});
				viewObj.menteeCount = countMentees.true || 0;

				cb();
			})
		},
		//get topics
		function(cb) {
			topicRef.on('value', function(snapshot) {
				//get topics
				viewObj.topics = snapshot.val();
				cb();
			});
		}
	], function(err) {
		if(err) throw err;

		res.render('topics', viewObj);
	});
});

module.exports = router;
