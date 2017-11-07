const Sequelize = require('sequelize')
const db = require('../db')

const ProductCategory = db.define('productCategory', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    isInt: true
  }
})

module.exports = ProductCategory
