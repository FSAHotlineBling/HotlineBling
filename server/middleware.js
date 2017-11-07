const { ProductOrders, Order } = require('./db/models/index')

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
  },

  // hasOrderedPhone: (req, res, next) => {
  //   console.log('REQBODY IS', req.body)
  //   let productId = req.body
  //   Order.findAll({
  //     where: { userId: req.user.id }
  //   })
  //     .then(orders => {
  //       orders.forEach(order => {
  //         ProductOrders.findOne({
  //           where: {
  //             orderId: order.id,
  //             productId: productId
  //           }
  //         })
  //           .then(productOrder => {
  //             if (productOrder) return next()
  //           })
  //       })
  //       reject(405, 'This user has not purchased the item before.', next)
  //     }
  //   )}
}
