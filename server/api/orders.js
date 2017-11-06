const router = require('express').Router()
const { Order, ProductOrders } = require('../db/models')
module.exports = router

router.use('/view', require('./vieworders'))

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      return order
    })
    .then(order => {
      return ProductOrders.create({ productId: req.body.productId, orderId: order.id })
    })
    .then(order => {
      res.cookie('cartId', order.orderId).json(order)
    })
    .catch(next)
})

router.get('/:userid', (req, res, next) => {
  let id = req.params.userid
  Order.findOne({
    where: {
      userId: id,
      status: 'created'
    }
  })
    .then(order => res.json(order))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  let id = req.params.orderId
  Order.update(req.body, {
    where: {
      id: id
    }
  })
    .then(order => res.json(order))
    .catch(next)
})