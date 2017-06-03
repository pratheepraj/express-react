module.exports = function(req, res, next) {

  if (req.isAuthenticated() || req.url === '/login') return next();
  res.redirect('/login');
};
