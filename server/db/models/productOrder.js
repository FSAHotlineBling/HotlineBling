const Sequelize = require('sequelize')
const db = require('../db')
const { Product } = require('./index')

const ProductOrder = db.define('productOrders', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
}, {
  defaultScope: {
    include: [ {model: Product} ]
  }
})

module.exports = ProductOrder


