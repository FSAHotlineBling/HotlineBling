const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  reviewText: {
    type: Sequelize.TEXT
  },
  stars: {
    type: Sequelize.INTEGER,
    max: 5
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
})

module.exports = Review
