const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')

//Associations
 Product.belongsToMany(Category) //Will create join table Product-Category
 Category.belongsToMany(Product)
 Product.belongsToMany(Order) //Will create join table Product-Order
 Order.belongsToMany(Product)
 Product.hasMany(Review)
 Review.belongsTo(Product)
 User.hasMany(Order)
 Order.belongsTo(User)
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
  Category
}
