const reject = (status, msg, next) => {
  const err = new Error(msg)
  err.status = status;
  next(err);
}

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.user) return next();
    reject(401, "This user is not logged in so they do not have access to do this", next);
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();
    reject(401, "This user is not an Admin so they do not have access to do this", next);
  }
}