module.exports = function(app, passport) {
  // home
  app.get('/', function(req,res){
    res.render('index', {title: 'express'});
  });

  app.get('/auth/github', passport.authenticate('github', {scope: 'email'}));

  app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/'
    })
  );

}