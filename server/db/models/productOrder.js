const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  productId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder


