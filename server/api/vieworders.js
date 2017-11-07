const Promise = require('bluebird')
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
  .then(orders => {
    orders.forEach(order => {
      let total = 0;
      order.products.forEach(product => {
        total += product.price * product.productOrders.quantity
      })
      order.total = total.toFixed(2);
    })
    res.json(orders)
  })
    .catch(next)
})

// GET '/api/orders/view/:userId => will fetch all orders from db matching userId
orderRouter.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: { userId: req.params.userId },
    include: [ Product ],
    order: [ ['dateCreated', 'DESC'] ]
  })
    .then(orders => {
      //array of all orders
      orders.forEach(order => {
        let total = 0;
        //within each order, array of products
        order.products.forEach(product => {
          total += product.price * product.productOrders.quantity
        })
        order.total = total.toFixed(2);
      })
      res.json(orders)
    })
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

