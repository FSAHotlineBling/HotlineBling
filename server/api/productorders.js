const router = require('express').Router()
const {ProductOrders, Product, Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  console.log("yep")
  let orderId = req.body.orderId ? req.body.orderId : req.cookies.cartId
  console.log("order id in da route", orderId)
  ProductOrders.findOrCreate({
    where: {orderId: orderId, productId: req.body.productId}
  })
  .spread((prodOrder, created) => {
    console.log("in here!!!!!!!!!!")
    console.log(created)

    if (!created){

      let newQuantity = prodOrder.quantity + 1;
      return ProductOrders.update(
        { quantity: newQuantity },
        {where: {orderId: orderId, productId: req.body.productId}
      })
    } else {
      return prodOrder
    }
    })
    .then(productOrder => {
      Order.findById(productOrder.orderId)})
    .then(order => res.json(order))
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
