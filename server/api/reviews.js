const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

router.post('/', (req, res, next) => {
  Review.create(req.body)
    //NEED TO CONNECT TO USER ID & PRODUCT ID
    .then(review => res.json(review))
    .catch(next)
})
