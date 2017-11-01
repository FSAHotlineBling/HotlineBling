const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER
  },
  productId: {
    type: Sequelize.INTEGER
  },
  orderId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductOrder


