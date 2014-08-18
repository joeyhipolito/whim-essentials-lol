module.exports = function(app, passport) {
  // home
  app.get('/', function(req,res){
    res.json({message: 'welcome to whim api-like backend lol!'});
  });

  app.get('/auth/github', passport.authenticate('github', {scope: ['user:email', 'repo', 'delete_repo', 'read:org']}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/'
    })
  );

  app.get('/secured', isLoggedIn, function(req, res){
    var User = require('../models/user.js');
    User.find(function(err, users) {
      if (err){
        res.json({error: 1, errorMessage: err});
      }
      res.json(users);
    });
  });
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.json({error: 1, errorMessage: 'you are not authenticated'});
}