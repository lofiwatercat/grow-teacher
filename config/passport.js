const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const { secretOrKey } = require('./keys');
const passport = require('passport');

passport.use(new LocalStrategy({
    session: false,
    usernameField: 'email',
    passwordField: 'password',
  }, async function (email, password, done) {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.hashedPassword, (err, isMatch) => {
        if (err || !isMatch) done(null, false);
        else done(null, user);
      });
    } else
      done(null, false);
  }));

  exports.loginUser = async function(user) {
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email
    };
    const token = await jwt.sign(
      userInfo, // payload
      secretOrKey, // sign with secret key
      // Tell the key to expire in one hour
      { expiresIn: 3600 }
    );
    return {
      user: userInfo,
      token
    };
  };

// Validate secretOrKey before creating JWT strategy
if (!secretOrKey) {
  const error = new Error('SECRET_OR_KEY is not set or is empty. Please set the SECRET_OR_KEY environment variable.');
  console.error(error.message);
  console.error('Current NODE_ENV:', process.env.NODE_ENV);
  console.error('SECRET_OR_KEY value:', process.env.SECRET_OR_KEY ? 'SET (but may be empty)' : 'NOT SET');
  throw error;
}

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await User.findById(jwtPayload._id)
    if (user) {
      // return the user to the frontend
      return done(null, user);
    }
    // return false since there is no user
    return done(null, false);
  }
  catch(err) {
    done(err);
  }
}));

exports.requireUser = passport.authenticate('jwt', { session: false });

exports.restoreUser = (req, res, next) => {
    return passport.authenticate('jwt', { session: false }, function(err, user) {
      if (user) req.user = user;
      next();
    })(req, res, next);
  };