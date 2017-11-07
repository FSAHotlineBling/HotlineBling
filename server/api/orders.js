const router = require('express').Router()
const { Order, ProductOrders, Product } = require('../db/models')
const { isLoggedIn, isAdmin } = require('../middleware')
module.exports = router

router.use('/view', require('./vieworders'))

router.post('/', (req, res, next) => {
  console.log('REQBODY IS', req.body)
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
    console.log('ORDERID:', req.cookies.cartId)
    console.log('PRODUCTID:', req.body.productId)
    ProductOrders.create({
      orderId: req.cookies.cartId, productId: req.body.productId
    })
      .then(productOrder =>
        Order.findById(productOrder.orderId))
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
  Order.findOne({
    where: {
      userId: id,
      status: 'created'
    },
    include: [Product]
  })
    .then(order => res.json(order))
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
