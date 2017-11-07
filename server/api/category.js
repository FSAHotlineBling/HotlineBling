const router = require('express').Router()
const {Category} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
      include: [{ all: true }]
  })
    .then(phones => res.json(phones))
    .catch(next)
})
