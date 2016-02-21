var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send(ref.getAuth());
});

module.exports = router;
