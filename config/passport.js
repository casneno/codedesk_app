const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, callback){
    try {
      let user = await User.findOne({ googleId: profile.id}) //find the googleId within the 'profile' object (found in Google documentation)
      if(user) return callback(null, user);
      //We have a new user via OAuth!
      user = await User.create({
        name: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      });
      return callback(null, user);
    } catch (err) {
      return callback(err);
    }
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(async function(userId, cb) {
  cb(null, await User.findById(userId));
});