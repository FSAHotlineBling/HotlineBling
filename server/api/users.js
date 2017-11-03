const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin', 'name']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.put('/admin/:id', (req, res, next) => {
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