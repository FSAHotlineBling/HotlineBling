const router = require('express').Router()
const {ProductOrders, Product, Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  ProductOrders.create(req.body)
    .then(productOrder => {
      res.json(productOrder)
    })
    .catch(next)
})


router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId,
      {
      include: [Product]
    })
      .then(order => res.json(order.products))
      .catch(next);
  })

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId
  ProductOrders.destroy({
    where: {
      productId: id
    }
  })
  .then(() => res.status(204).end())
  .catch(next);
})

router.put('/', (req, res, next) => {
  ProductOrders.update({quantity: req.body.quantity}, {
    where: {
      productId: req.body.productId,
      orderId: req.body.orderId
    }
  })
  .then(productorder => res.json(productorder))
  .catch(next)
})