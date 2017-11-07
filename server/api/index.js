const router = require('express').Router()

module.exports = router

router.use('/users', require('./users'))

router.use('/reviews', require('./reviews'))

router.use('/phones', require('./products'))

router.use('/orders', require('./ordersEO'))

router.use('/productorders', require('./productorders'))

router.use('/category', require('./category'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
