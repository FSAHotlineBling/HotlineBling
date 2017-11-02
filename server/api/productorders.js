const router = require('express').Router()
const {ProductOrders} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  ProductOrders.create(req.body)
    .then(productOrder => {
      res.json(productOrder)
    })
    .catch(next)
  if (!req.user && !req.session.cookie.cartId){
    req.session.cookie = Object.assign({}, req.session.cookie, {cartId: req.body.orderId})
  }
  console.log("NEW COOKIE", req.session.cookie)
})
