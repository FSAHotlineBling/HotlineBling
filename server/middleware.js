const { Product, Order } = require('./db/models/index')

const reject = (status, msg, next) => {
  const err = new Error(msg)
  err.status = status;
  next(err);
}

module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.user) return next();
    reject(401, 'This user is not logged in so they do not have access to do this', next);
  },

  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();
    reject(401, 'This user is not an Admin so they do not have access to do this', next);
  }

  // purchased: (req, res, next) => {
  //   Order.findAll({
  //     where: {
  //       userId: req.user.id,
  //       include: [Product]
  //     }
  //   })
  //     .then(user => {
  //       if (req.user) {
  //         return next()
  //       }
  //       reject(401, 'This user did not purchase this item so they do not have access to leave a review', next);
  //     })
  //     .catch(next)
  // }
}
