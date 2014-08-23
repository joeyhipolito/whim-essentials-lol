var express  = require('express');
var app      = express();

var path     = require('path');
var logger   = require('morgan');
var passport = require('passport');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session = require('express-session');

var configDB = require('./config/db.js');

// configs
mongoose.connect(configDB.url);
require('./config/passport')(passport);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

// passport requisites
app.use(session({
    secret: 'dinarinnamininaasahangmaintindihan',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
require('./routes/routes.js')(app,passport);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});


module.exports = app;
