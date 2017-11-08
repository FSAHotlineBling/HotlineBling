const router = require('express').Router()
const { Order, ProductOrders, Product } = require('../db/models')
const { isLoggedIn, isAdmin } = require('../middleware')
module.exports = router

router.use('/view', require('./vieworders'))

router.post('/', (req, res, next) => {
  if (!req.cookies.cartId) {
    Order.create(req.body)
      .then(order => {
        return order
      })
      .then(order => {
        ProductOrders.create({ productId: req.body.productId, orderId: order.id })
        return order
      })
      .then(order => {
        res.cookie('cartId', order.id).json(order)
      })
      .catch(next)
  } else {
    ProductOrders.findOrCreate({
      where: {orderId: req.cookies.cartId, productId: req.body.productId}
    })
      .spread((prodOrder, created) => {
        if (!created){
          let newQuantity = prodOrder.quantity + 1;
          return ProductOrders.update(
            { quantity: newQuantity },
            {where: {orderId: req.cookies.cartId, productId: req.body.productId}
          })
        } else {
          return prodOrder
        }
    })
      .then(() =>{
        return ProductOrders.findOne({
          where: {orderId: req.cookies.cartId}
      })})
      .then((obj) =>{
        return Order.findOne({
          where: {id: obj.orderId}
      })})
      .then(order => res.json(order))
  }
})

router.put('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [Product]
  })
    .then(order => order.update(req.body))
    .then(updatedOrder => res.status(201).json(updatedOrder))
    .catch(next)
})


router.get('/admin/:orderId', isAdmin, (req, res, next) => {
  Order.findById(req.params.orderId, {
    include: [Product]
  })
    .then(order => res.json(order))
    .catch(next)
})


router.get('/:userid', (req, res, next) => {
  let id = req.params.userid
  Order.findOrCreate({
    where: {
      userId: id,
      status: 'created'
    },
    include: [Product]
  })
    .then(order => res.json(order[0]))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  let id = req.params.orderId
  Order.update(req.body, {
    where: {
      id: id
    },
    include: [Product]
  })
    .then(order => res.json(order))
    .catch(next)
})

router.post('/noproduct', (req, res, next) => {
  Order.create()
    .then(order => res.json(order))
    .catch(next)
})
