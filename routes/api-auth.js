const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sanitize = require('../utils/sanitize');
const Users = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.getOne({ _id: id });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  try {
    const user = await Users.getOne({ email });

    if (user && user.active && user.enabled) {
      const isMatch = await Users.verifyPassword(password, user.password);
      if (isMatch) {
        return done(null, user);
      }
      return done(null, false, { message: 'Invalid Email or Password' });
    } else if (user && user.active && !user.enabled) {
      return done(null, false, { message: 'Account not active. Please contact the administrator' });
    }
    return done(null, false, { message: 'Invalid Email or Password' });
  } catch (err) {
    return done(null, false, { message: 'Error logging in. Please try again.' });
  }
}));

router.post('/register', async (req, res) => {
  const data = sanitize(req.body);
  try {
    await Users.createOne(data);
    res.json({
      message: `Registration successful.
      Please contact the admininistrator to activate the account.`,
    });
  } catch (err) {
    res.status(401).json(err);
  }
});

router.post('/login', (req, res, next) => {
  // eslint-disable-next-line consistent-return
  passport.authenticate('local', async (err, user, info) => {
    if (err) {
      return res.status(401).json(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    req.logIn(user, (loginError) => {
      if (loginError) {
        return res.status(401).json(loginError);
      }
      return res.json(user);
    });
  })(req, res, next);
});

module.exports = router;
