const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

// GET /api/reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then(reviews => res.json(reviews))
    .catch(next)
})

// POST /api/reviews
router.post('/', (req, res, next) => {
  Review.create(req.body)
    //NEED TO CONNECT TO USER ID & PRODUCT ID
    .then(review => res.json(review))
    .catch(next)
})
