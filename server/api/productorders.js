const router = require('express').Router()
const {ProductOrder} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  ProductOrder.create(req.body)
    .then(productOrder => res.json(productOrder))
    .catch(next)
})