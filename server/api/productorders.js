const router = require('express').Router()
const {ProductOrders, Product} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  ProductOrders.create(req.body)
    .then(productOrder => {
      res.json(productOrder)
    })
    .catch(next)
})

router.get('/:orderId', (req, res, next) => {
  let id = req.params.orderId
  console.log('HELLO', id)
  ProductOrders.findAll({
    where: {
      orderId: id
    },
    include: [Product]
  })
    .then(cartOrder => res.json(cartOrder))
    .catch(next)
})