var express = require('express'),
	router = express.Router(),
	Firebase = require('firebase');
	ref = new Firebase("https://peerngineer.firebaseio.com"),
	userRef = new Firebase("https://peerngineer.firebaseio.com/users"),
	cloudinary = require('cloudinary');

var multiparty = require('connect-multiparty'),
	multipartyMiddleware = multiparty();
router.use(multipartyMiddleware);

var viewObj = {
	title: 'Avatar | PEERNGINEER'
}

var username, id;

router.get('/', function(req, res) {
	var authData = ref.getAuth();
	if (authData) {

		username = authData.password.email.split('@')[0]

		//get user data
		userRef.child(username).once('value', function(snapshot) {
			var exists = (snapshot.val() !== null);
			viewObj.auth = authData;
			if (exists) {
				viewObj.user = snapshot.val();
				return res.render('user/changeavatar', viewObj);
			} else {
				return res.redirect('profile_edit');
			}
		});
	} else {
		console.log("User not authenticated");
		return res.redirect('/access/login');
	}
});


router.post('/', function(req, res) {

	var imageFile = req.files.image.path;
	// Upload images
	if(!imageFile){
	  console.log("There was an error") // Handle this error

	 } else {

		cloudinary.uploader.upload(imageFile, function(result) { 

			if (result.error) {
				console.log(result.error.message) // Handle this error
			} else {
				console.log(result);
				var userRef = ref.child('users');
				userRef = new Firebase("https://peerngineer.firebaseio.com/users/" + username );
				userRef.update({gravatar: result.secure_url}, function(err) {
					if(err) throw err;
					res.redirect('/user/profile');
				})
			}
		}, { public_id: username });
	}
});

module.exports = router;