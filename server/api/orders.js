const orderRouter = require('express').Router()
const { Order, Product } = require('../db/models')

module.exports = orderRouter

orderRouter.get('/', (req, res, next) => {
  console.log('inside orders route')
  res.send('here')
})

// GET '/api/orders/:userId => will fetch all orders from db matching userId
orderRouter.get('/:userId', (req, res, next) => {
  Order.findAll({
    where: { userId: req.params.userId },
    include: [ Product ]
  })
    .then(orders => res.json(orders))
    .catch(next);
})
