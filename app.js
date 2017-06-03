const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('cookie-session');
const mongoose = require('mongoose');
const _ = require('lodash');
const Config = require('./constants/config');
const { USER_ROLES } = require('./constants');

require('mongoose-cache').install(mongoose, {
  max: 140,
  maxAge: 1000 * 60 * 30,
});

// Connect to mongodb
const connect = function () {
  const options = { server: { socketOptions: { keepAlive: 1 } } };
  if (Config.MONGODB.USER !== '' && Config.MONGODB.PASS !== '') {
    options.user = Config.MONGODB.USER;
    options.pass = Config.MONGODB.PASS;
  }
  mongoose.connect(Config.MONGODB.HOST, options);
  mongoose.set('debug', Config.MONGODB.DEBUG || false);
};
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', () => {
  console.log('Connected to mongo db');
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session_hash',
  secret: 'RD$##@&%^&^%*^*^&W^^ES%^23a',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true },
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Inject extra values inside the view
app.use((req, res, next) => {
  const _render = res.render;
  res.render = function (view, options = {}, fn) {
    options.user = req.user || null;
    options.USER_ROLES = USER_ROLES;
    options._ = _;
    if (Config.csrf) {
      options.csrf = req.csrfToken();
    }
    _render.call(this, view, options, fn);
  };
  next();
});

app.use('/api/auth', require('./routes/api-auth'));
app.use('/api/users', require('./routes/api-users'));
app.use('/api/posts', require('./routes/api-posts'));
app.use('/api/comments', require('./routes/api-comments'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
