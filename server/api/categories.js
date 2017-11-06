const router = require('express').Router()
const { Category } = require('../db/models')
const {Review} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

router.post('/', (req, res, next) => {
    Category.findOrCreate({
        where: {
            value: req.body.value,
            category: req.body.category
        }
    })
    .then((product) => {
        res.status(201).json(product);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    Category.findById(id)
      .then(category => res.json(category))
      .catch(next)
  })
  