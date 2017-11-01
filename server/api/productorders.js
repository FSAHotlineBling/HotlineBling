const router = require('express').Router()
const {ProductOrders} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  ProductOrders.create(req.body)
    .then(productOrder => {
      res.json(productOrder)
    })
    .catch(next)
})