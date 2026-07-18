const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        // 1. Already linked via googleId
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);

        // 2. Existing account with same email — link the Google ID to it
        if (email) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            user.avatar = user.avatar || profile.photos?.[0]?.value || '';
            await user.save();
            return done(null, user);
          }
        }

        // 3. Brand new user
        user = await User.create({
          name: profile.displayName,
          email,
          googleId: profile.id,
          avatar: profile.photos?.[0]?.value || '',
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Required by passport even though we use JWTs, not sessions —
// we keep sessions disabled (see server.js) but Passport's API expects these.
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
