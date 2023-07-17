var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'CodeDesk' });
});

// (1)LOGIN Route
router.get('/auth/google', passport.authenticate('google', 
  {
    scope: ['profile','email'],
    //Optionally force pick account every time
    prompt: "select_account"
  }
));

// (2)Google CALLBACK Route
router.get('/oauth2callback', passport.authenticate('google',
  {
    successRedirect: '/home',
    failureRedirect: '/home'
  }
));

// (3)LOGOUT Route
router.get('/logout', function(req,res) {
  req.logout(function() {
    // Change path for your "landing" page
    res.redirect('/home');
  });
});

module.exports = router;
