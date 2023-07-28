const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(
  new GoogleStrategy({
    clientID: '1047654540465-e0aabe4gonagaq1si43dr6788d54kr3e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  }, (accessToken, refreshToken, profile, cb) => {
    // This function will be called when a user is authenticated
    // You can use the profile information to create or update a user in your database
    return cb(null, profile);
  })
);

// Serialize the user into the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize the user out of the session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Middleware to initialize Passport
module.exports = passport;