const router = require('express').Router()
const { Review, User } = require('../db/models')
module.exports = router

// GET /api/reviews
router.get('/', (req, res, next) => {
  Review.findAll({ include: [User] })
    .then(reviews => res.json(reviews))
    .catch(next)
})

// POST /api/reviews
router.post('/', (req, res, next) => {
  Review.create(req.body)
    .then(review => res.json(review))
    .catch(next)
})
