var express = require('express');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();
var request = require('request');

router.post('/search', function(req, res) {
  var queryString = req.body.s
  console.log(req.body.s);
  request({
    url: 'https://api.twitter.com/1.1/search/tweets.json',
    headers: {
      'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN
    },
    qs: {
      q: queryString
    }
  }, function(error,response,body) {
    console.log(error);
    console.log(response.statusCode);
    console.log(body);
    if(!error && response.statusCode === 200) {
      var dataObj = JSON.parse(body);
      console.log('after request');
      res.render('show', {tweets: dataObj});
    }
  })
})

// router.post('/show', function(req,res) {

// })

//helper  function for formatting


module.exports = router;
