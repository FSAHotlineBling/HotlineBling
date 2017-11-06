const orderRouter = require('express').Router()
const { Order, Product } = require('../db/models')

module.exports = orderRouter

//GET /api/orders/view - for admin to view all orders
orderRouter.get('/', (req, res, next) => {
  Order.findAll({
    include: [ Product ],
    order: [ ['dateCreated', 'DESC'] ],
    //limit: 100 - will do pagination later if time
  })
    .then(orders => res.json(orders))
    .catch(next)
})

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
