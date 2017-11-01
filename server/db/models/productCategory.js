const Sequelize = require('sequelize')
const db = require('../db')

const ProductCategory = db.define('productCategory', {
  productId: {
    type: Sequelize.INTEGER
  },
  categoryId: {
    type: Sequelize.INTEGER
  }
})

module.exports = ProductCategory
