const router = require('express').Router()
const { Order, ProductOrders } = require('../db/models')
module.exports = router

router.use('/view', require('./vieworders'))

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      res.json(order)
      ProductOrders.create({ productId: req.body.productId, orderId: order.id })
      if (!req.user && !req.session.cookie.cartId) {
        req.session.cookie = Object.assign({}, req.session.cookie, { cartId: order.id })
      }
      console.log('LOOKING FOR PRE AUTH COOKIE', req.session.cookie.cartId)
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
