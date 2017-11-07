const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
    validate:{
      isFloat: true
    }
  },
  quantityAvailable: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://images.mentalfloss.com/sites/default/files/red-phone.jpg?resize=1100x740'
  }
})

module.exports = Product
