const Promise = require('bluebird')
const router = require('express').Router()
const User = require('../db/models/user')
const { Order, ProductOrders } = require('../db/models')

module.exports = router

// const isLoggedIn = () => (req, res, next) => {
//   if (req.user) return next()
//   const err = new Error('User not authenticated')
//   err.status = 401
//   next(err)
// }

// const isAdmin = () => (req, res, next) => {
//   if (req.user && req.user.isAdmin) return next()
//   const err = new Error('User not authorized')
//   err.status = 401
//   next(err)
// }


router.post('/login', (req, res, next) => {
  //find the user in the database
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      //if no matching user is found
      if (!user) {
        res.status(401).send('User not found')
        //or if the password entered is wrong
      } else if (!user.correctPassword(req.body.password)) {
        res.status(401).send('Incorrect password')
        //if you've made it this far, good job user
      } else {
        req.login(user, err => {
          if (err) { next(err) }
          else {
            //set the session userId to the found user's id
            req.session.userId = user.id;
            //if user's cookie contains cartId, they had a cart before signing in
            if (req.cookies.cartId) {
              //check to see if that user has any other existing open (aka 'created') orders in the db
              Order.findOne({
                where:
                { userId: user.id, status: 'created' }
              })
                .then(order => {
                  //if no matching order is found
                  if (!order) {
                    //find their pre-sign-in cart and associate it with their userId
                    Order.findById(req.cookies.cartId)
                      .then((order) => {
                        order.update({ userId: user.id })
                      })
                    //if they do have an open ('created') order in the db already -> merge the two carts
                  } else {
                    //now need to get into Product Orders table and find orders with either orderId & change it to new orderid
                    ProductOrders.findAll({
                      where:
                      { orderId: req.cookies.cartId }
                    })
                      .then(productOrders => {
                        return Promise.map(productOrders, function (productOrder) {
                          productOrder.update({ orderId: order.id })
                        }
                        )
                      })
                      .then(orders => console.log('SUCCESSFUL TRANSFER OF CART??????????: ', orders))
                  }
                }
                )
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
          if (req.cookies.cartId) {
            Order.findById(req.cookies.cartId)
              .then((order) => {
                order.update({
                  userId: user.id
                })
              })
          }
          res.json(user)
        }
      })
    })
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
