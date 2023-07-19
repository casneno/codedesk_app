module.exports = function(req, res, next) {
  /* if there is a logged in user... */
  if (req.isAuthenticated()) return next();/* the 'return' exits the function and prevents the next line of code from running */
  /* if not logged in... send him to login page*/
  res.redirect('/auth/google');
};
/* This avoids people trying to enter pages without a credential */