const orderRouter = require('express').Router()
const { Order, Product } = require('../db/models')

module.exports = orderRouter

// orderRouter.get('/', (req, res, next) => {
//   console.log('inside orders route')
//   res.send('here')
// })

// GET '/api/orders/view/:userId => will fetch all orders from db matching userId
orderRouter.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: { userId: req.params.userId },
    include: [ Product ],
    order: [ ['dateCreated', 'DESC'] ]
  })
    .then(orders => res.json(orders))
    .catch(next);
})

// GET /api/orders/view/:userId/:orderId
orderRouter.get('/:userId/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [Product]
  })
    .then(order => res.json(order))
    .catch(next)
})

// GET /api/orders/view/:userId/:orderId
// orderRouter.get('/:orderId', (req, res, next) => {
//   Order.findById(req.params.userId, {
//     include: [ Product]
//   })
//     .then(order => res.json(order))
//     .catch(next)
// })
