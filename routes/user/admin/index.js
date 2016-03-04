var _ = require('underscore'),
	express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users");

var viewObj = {
	title: 'Admin | PEERNGINEER'
};

/* GET users listing. */
router.get('/', function(req, res, next) {

	//calculate users and other data to send to view
	userRef.on('value', function(snapshot) {

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

	}, utils.authRedir(req, res, 'user/admin', viewObj));

});

module.exports = router;
