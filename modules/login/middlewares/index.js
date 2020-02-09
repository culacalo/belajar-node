const passport = require('passport');
const { Strategy, ExtractJwt} = require('passport-jwt');

passport.use(new Strategy({
  secretOrKey: 'WakYED',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// eslint-disable-next-line consistent-return
}, async (token, done) => {
  try {
    console.log(token);
    return done(null, token);
  } catch (error) {
    return done(error);
  }
}));