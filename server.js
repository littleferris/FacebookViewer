var express = require('express');
var passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook')
.Strategy;

var app = express();
app.use(session({secret: 'dae334e50c7038279c7ca7375bcb853f'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID: '806693016172772',
  clientSecret: 'dae334e50c7038279c7ca7375bcb853f',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  console.log("token", token);
  return done(null, profile);
}));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook',  {
  successRedirect: '/me',
  failureRedirect:'/auth/facebook'
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', function( req, res ) {
  res.json(req.user);
  console.log(req.user);
});

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
});
