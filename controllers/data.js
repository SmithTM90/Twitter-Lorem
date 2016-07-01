var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');


//Twitter API call, uses an environment variable as the access token for all querys made to the API
router.post('/search', isLoggedIn, function(req, res) {
  if(isLoggedIn === false) res.redirect('/');
  var queryString = req.body.s
  request({
    url: 'https://api.twitter.com/1.1/search/tweets.json?lang=en&count=30&result_type=popular',
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
    },
    qs: {
      q: queryString
    }
  }, function(error,response,body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      dataObj.statuses.length = req.body.loremLength
      res.render('main/show', {tweets: dataObj.statuses});
    }
  });
});

//Adds selected lorem to the favorites database, with an association to the current user
router.post('/favorites', isLoggedIn, function(req,res) {
  db.lorem.findOrCreate({
    where: { content: req.body.content }
  }).spread(function(lorem, created) {
    db.users_lorems.create({
      userId: req.user.id,
      loremId: lorem.id
    });
  });
  res.redirect('/');
});

//Gets the favorites from the database that match the current user's id
router.get('/favorites', isLoggedIn, function(req,res) {
  db.user.findOne({
    where: { id: req.user.id }
  }).then(function(user){
    user.getLorems().then(function(lorems) {
      res.render('profile.ejs', { favorites: lorems});
    });
  });
});

module.exports = router;
