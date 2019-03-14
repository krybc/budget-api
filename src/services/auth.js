const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/user');
const constants = require('../config/constants');

/**
 * Local Strategy Auth
 */
const localOpts = { usernameField: 'email' };

const localLogin = new LocalStrategy(
  localOpts,
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false);
      } else if (!user.authenticateUser(password)) {
        return done(null, false);
      }

      return done(null, user);
    } catch (e) {
      return done(e, false);
    }
  }
);

/**
 * JWT Strategy Auth
 */
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: constants.jwt.secret,
};

const jwtLogin = new Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await User.findById(payload._id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);

exports.authLocal = passport.authenticate('local', { session: false });
exports.authJwt = passport.authenticate('jwt', { session: false });
