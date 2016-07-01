var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

//The route used for the delete functionality, finds the current user and uses that association to remove entries from the favorites database as well as the front end display.
app.delete('/remove/:id', function(req,res) {
  console.log('DELETE FUNCTION')
  console.log(req.params.id);
  db.user.findOne({
    where: {id : req.user.id}
  }).then(function(user) {
    user.removeLorem(req.params.id).then(function() {
      db.lorem.findOne({
        where: {id: req.params.id}
      }).then(function(lorem) {
        lorem.destroy().then(function() {
          res.send('deleted properly');
        });
      });
    });
  });
});

app.use('/auth', require('./controllers/auth'));
app.use('/data', require('./controllers/data'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
