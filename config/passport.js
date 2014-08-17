var FacebookStrategy = require('passport-facebook').Strategy;
var GithubStrategy   = require('passport-github').Strategy;
var User = require('../models/user');

// load auth variables
var configAuth = require('./auth');


module.exports = function(passport) {
  

  passport.use(new FacebookStrategy(
  {
    clientID     : configAuth.facebookAuth.clientID,
    clientSecret : configAuth.facebookAuth.clientSecret,
    callbackURL  : configAuth.facebookAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    // async
    process.nextTick(function() {
      User.findOne({'facebook.id' : profile.id}, function(err, user){
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.facebook.id = profile.id,
          newUser.token = token,
          newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
          newUser.email = profile.emails[0].value;

          // save
          newUser.save(function(err){
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }
  ));

  passport.use(new GithubStrategy(
  {
    clientID     : configAuth.githubAuth.clientID,
    clientSecret : configAuth.githubAuth.clientSecret,
    callbackURL  : configAuth.githubAuth.callbackURL
  },
  function(token, refreshToken, profile, done) {
    // async
    process.nextTick(function() {
      User.findOne({'github.id' : profile.id}, function(err, user){
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          newUser.github.id = profile.id,
          newUser.token = token,
          newUser.name = profile.displayName;
          // newUser.email = profile.emails[0].value;

          // save
          newUser.save(function(err){
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }
  ));

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

}