const router = require('express').Router()
const {Product} = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(phones => res.json(phones))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  let id = req.params.id

  Product.findById(id,
    { include: [Review]
  })
    .then(phone => res.json(phone))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
    Product.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(() => {
        res.sendStatus(201);
    })
    .catch(next);
});

