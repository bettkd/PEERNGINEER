var _ = require('underscore'),
	express = require('express'),
	router = express.Router(),
	async = require('async'),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users"),
	topicRef = new Firebase("https://peerngineer.firebaseio.com/topics");

var viewObj = {
	title: 'Admin | PEERNGINEER'
};

/* GET users listing. */
router.get('/', function(req, res, next) {

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

		utils.authRedir(req, res, 'user/admin', viewObj)
	});
});

//handle topic creation
router.post('/add-topic', function(req, res) {
	var topicData = {
		id: [req.body.shortname.toLowerCase(), utils.ranStr(6)].join("-"),
		name: req.body.topic,
		shortname: req.body.shortname,
		category: req.body.category
	},
		topicRef = new Firebase("https://peerngineer.firebaseio.com/topics/" + topicData.shortname);

	topicRef.update(topicData, function(err) {
		if(err) throw err;

		res.redirect('/user/admin?topicAdded=true');
	});
});

//handle topic data updates
router.post('/update-topic', function(req, res) {
	var topicData = {
		name: req.body.topic,
		shortname: req.body.shortname,
		category: req.body.category
	},
		topicRef = new Firebase("https://peerngineer.firebaseio.com/topics/" + topicData.shortname);

	topicRef.update(topicData, function(err) {
		if(err) throw err;

		res.redirect('/user/admin?topicUpdated=true');
	});
});

//handle user edits
router.post('/edit-user', function(req, res) {
	console.log(req.body.isMentor);
	var userData = {
		isMentor: (req.body.isMentor === "true") ? true : false,
		isAdmin: (req.body.isAdmin === "true") ? true : false
	},
		userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + req.body.username);

	userRef.update(userData, function(err) {
		if(err) throw err;

		res.redirect('/user/admin?userUpdated=true');
	});
});

//TODO:
//handle user data delete
router.post('/delete-user', function(req, res) {
	res.redirect('/user/admin');
});

module.exports = router;
