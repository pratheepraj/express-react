const { USER_ROLES } = require('../constants');

function isLoggedIn(req, res, next) { // eslint-disable-line consistent-return
  if (req.isAuthenticated() || req.url === '/login') {
    return next();
  }

  if (req.xhr) {
    res.status(401).json({ message: 'Not authorized' });
  } else {
    res.redirect('/login');
  }
}

function isAdmin(req, res, next) { // eslint-disable-line consistent-return
  if (req.user.role === USER_ROLES.ADMIN) {
    return next();
  }

  if (req.xhr) {
    res.status(401).json({ message: 'Not authorized' });
  } else {
    res.redirect('/admin');
  }
}

function isAdminOrSelf(req, res, next) { // eslint-disable-line consistent-return
  if (req.user.role === USER_ROLES.ADMIN ||
    req.user._id == req.params.id) { // eslint-disable-line eqeqeq
    return next();
  }

  if (req.xhr) {
    res.status(401).json({ message: 'Not authorized' });
  } else {
    res.redirect('/admin');
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isAdminOrSelf,
};
