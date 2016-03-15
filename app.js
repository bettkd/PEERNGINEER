var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var utils = require('./lib/util');

//get firebase
var Firebase = require('firebase'),
	ref = new Firebase("https://peerngineer.firebaseio.com");

// Get Cloudinary API
var cloudinary = require('cloudinary');

var routes = require('./routes'),
	login = require('./routes/access/login'),
	logout = require('./routes/access/logout'),
	register = require('./routes/access/register'),
	resetpasswd = require('./routes/access/resetpasswd'),
	changepasswd = require('./routes/access/changepasswd'),
	admin = require('./routes/user/admin'),
	mentor = require('./routes/user/admin/mentor'),
	profile = require('./routes/user/profile'),
	profile_edit = require('./routes/user/profile_edit'),
	changeavatar = require('./routes/user/changeavatar'),
	topics = require('./routes/topics'),
	topic = require('./routes/topics/topic');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set locals
app.use(function(req, res, next) {

	// check if user logged in
	if(ref.getAuth()) {
		res.locals.isUser = true;
	}

	//get page referer
	res.locals.referer = req.get('Referrer');

	next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(sassMiddleware({
	src: path.join(__dirname, 'public/stylesheets/scss/stylesheets'),
	dest: path.join(__dirname, 'public/stylesheets'),
	debug: true,
	outputStyle: 'compressed',
	prefix: '/stylesheets'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/access/login', login);
app.use('/access/logout', logout);
app.use('/access/register', register);
app.use('/access/resetpasswd', resetpasswd);
app.use('/access/changepasswd', changepasswd);
app.use('/user/admin', admin);
app.use('/user/admin/mentor', mentor);
app.use('/user/profile', profile);
app.use('/user/profile_edit', profile_edit);
app.use('/user/changeavatar', changeavatar);
app.use('/topics', topics);
app.use('/topic', topic);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Configure API for saving images
cloudinary.config({
	cloud_name: 'peerngineer',
	api_key: '897862564791181',
	api_secret: 'AJcDSocxqA4wrXSxqxD06iHtnDY'
});


module.exports = app;
