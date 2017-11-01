const router = require('express').Router()
const {Order} = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => {
      res.json(order)
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