var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var request = require('request');
var isLoggedIn = require('../middleware/isLoggedIn');

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

router.post('/favorites', function(req,res) {
  console.log(req.body.content);
  db.lorem.findOrCreate({
    where: { content: req.body.content }
  }).spread(function(user, created) {
    db.users_lorems.create({
      userId: user.id,
      loremId: lorem.id
    });
  });
  res.redirect('/profile');
});

module.exports = router;
