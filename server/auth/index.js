const Promise = require('bluebird')
const router = require('express').Router()
const User = require('../db/models/user')
const db = require('../db')
const Order = db.models.order
const ProductOrders = db.models.productOrders
const Sequelize = require('sequelize')
const Op = Sequelize.Op
// const { Order, ProductOrders } = require('../db/models')

module.exports = router



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
            req.session.userId = user.id;
            if (req.cookies.cartId) {
              return Order.findOne({
                where:
                { userId: user.id, status: 'created' }
              })
                .then(order => {
                  if (!order) {
                    Order.findById(req.cookies.cartId)
                      .then((foundOrder) => {
                        foundOrder.update({ userId: user.id })
                      })
                  } else {
                    let idsToMerge = []
                    return ProductOrders.findAll({
                      where: { orderId: order.id }
                    })
                      .then((orders => {
                        orders.forEach((order) => {
                          idsToMerge.push(order.productId)
                        })
                      }))
                      .then(() => {
                        console.log("ids", idsToMerge)
                        return ProductOrders.update(
                          { orderId: order.id },
                          {
                            where: {
                              orderId: req.cookies.cartId, productId: { [Op.notIn]: idsToMerge }
                            }
                          }
                        )
                      })
                      .then((updatedOrders) => {
                        console.log("updated orders", )
                        ProductOrders.destroy(
                          {where: {
                              orderId: req.cookies.cartId
                            }
                          }
                        )
                        res.clearCookie('cartId').json(user)
                      })
                    }
            })

          }}})
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
