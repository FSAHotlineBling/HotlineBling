const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const ProductOrders = require('./productOrder')
const ProductCategory = require('./productCategory')

//Associations

 Product.belongsToMany(Category, {through: ProductCategory})
 Category.belongsToMany(Product, {through: ProductCategory})
 Product.belongsToMany(Order, {through: ProductOrders})
 Order.belongsToMany(Product, {through: ProductOrders})

 Product.hasMany(Review)
 Review.belongsTo(Product)
 User.hasMany(Order)
 Order.belongsTo(User, {constraints: false})
 User.hasMany(Review)
 Review.belongsTo(User)


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  Review,
  Category,
  ProductCategory,
  ProductOrders
}
