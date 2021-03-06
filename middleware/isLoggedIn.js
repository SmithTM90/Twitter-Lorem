module.exports = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.flash('error', 'Please log in');
    res.redirect('/auth/login');
  }
};
