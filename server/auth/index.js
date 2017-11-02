const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')

module.exports = router

// const addUserIdToOrder = () => {
//   console.log('LOOKING FOR REQ COOKIE ****',req.session.cookie.cartId);

// }

router.post('/login', (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
      } else {
        req.login(user, err => {
          if (err) {
            next(err)
          }
          else {
            console.log('LOOKING FOR COOKIE***', req.session.cookie)
            req.session.userId = user.id;
            if (req.session.cookie.cartId){
              console.log('made it into the if block')
              Order.findById(req.session.cookie.cartId)
              .then((order) => {
                order.update({
                  userId: user.id
                })
              })
            }
            res.json(user)
          }
        })
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then(user => {
      req.login(user, err => {
        if (err) {
          next(err)
        }
        else {
          req.session.userId = user.id;
          addUserIdToOrder();
          res.json(user)
        }
      })
      // return user
    })
    // .then(user => {
    //   Order.create({
    //     userId: user.id,
    //     status: 'created',
    //     zip: '60067'
    //   })
    // })
    // .then(order => res.json(order))
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
