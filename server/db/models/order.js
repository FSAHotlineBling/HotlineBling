const Sequelize = require('sequelize')
const db = require('../db')
const { ProductOrders, Product } = require('./index')

const Order = db.define('order', {
  dateCreated: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  address: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.ENUM('AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY')
  },
  zip: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed', 'delivered'),
    defaultValue: 'created'
  },
  total: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.00
  }
})


module.exports = Order
