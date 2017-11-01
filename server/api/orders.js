const orderRouter = require('express').Router()
const { Order } = require('../db/models')

module.exports = orderRouter

// GET '/api/orders/:userId => will fetch all orders from db matching userId
orderRouter.get('/:userId', (req, res, next) => {
  Order.findAll({ where: { userId: req.params.userId }})
    .then(orders => res.json(orders))
    .catch(next);
})
