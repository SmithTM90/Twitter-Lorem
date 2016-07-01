var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

//Creates a user based on the info the user input, and saves it to the user database
router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'User created. You are logged in'
      })(req, res);
    } else {
      failureFlash: 'User with that email already exists'
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    console.log('error occurred', error.message);
    res.redirect('/auth/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

//Checks the user credentials using passport
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  successFlash: 'You are now logged in',
  failureRedirect: '/auth/login',
  failureFlash: 'Login failed, please try again or sign up'
}));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
