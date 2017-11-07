const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    isInt: true,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  }
})

module.exports = ProductOrder


