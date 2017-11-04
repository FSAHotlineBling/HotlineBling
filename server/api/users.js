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

router.get('/:id', (req, res, next) => {
    let id = req.params.id
    User.findById(id)
      .then(user=> res.json(user))
      .catch(next)
  })

router.put('/admin/:id', (req, res, next) => {
    console.log('LOOKING FOR REQ BODY*****', req.body)
  User.update({
    isAdmin: true
  }, {
      where: {
          id: req.params.id
      }
  })
  .then(() => {
      res.sendStatus(201);
  })
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
      .catch(next);
})
