var express = require('express'),
	router = express.Router()


//	function pastelColors(){
//		var r = (Math.round(Math.random()* 127) + 127).toString(16);
//		var g = (Math.round(Math.random()* 127) + 127).toString(16);
//		var b = (Math.round(Math.random()* 127) + 127).toString(16);
//		return '#' + r + g + b;
//	}

var viewObj = {
	title: 'Resources | PEERNGINEER',
	resources: 
	[{
		name: 'Coursera',
		alias: 'Coursera',
		url: 'https://www.coursera.org/'
	},
	{
		name: 'Khan Academy',
		alias: 'Khan',
		url: 'https://www.khanacademy.org/'
	},
	{
		name: 'Codecademy',
		alias: 'Code',
		url: 'https://www.codecademy.com/'
	},
	{
		name: 'MIT Open Courseware',
		alias: 'OCW',
		url: 'http://ocw.mit.edu/courses/intro-programming/'
	},
	{
		name: 'Learn X in Y Minutes',
		alias: 'XinY',
		url: 'https://learnxinyminutes.com/docs/bash/'
	},
	{
		name: 'Google CS Education',
		alias: 'GoogleCS',
		url: 'https://www.google.com/edu/cs/index.html'
	}]
};

router.get('/', function(req, res) {





	res.render('resources', viewObj);
});

module.exports = router;
