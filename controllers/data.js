var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var request = require('request');

router.post('/search', function(req, res) {
  var queryString = req.body.s
  request({
    url: 'https://api.twitter.com/1.1/search/tweets.json?lang=en',
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
    },
    qs: {
      q: queryString
    }
  }, function(error,response,body) {
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      //set helper function call to variable
      //var format = loremFormat(dataObj.statuses.text)
      res.render('main/show', {tweets: dataObj.statuses});
    }
  })
})

//helper function for formatting
loremFormat = function(string) {
  string.replace(RT, '');
  return;
};


module.exports = router;
