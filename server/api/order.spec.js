// /* global describe beforeEach it */

// const { expect } = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const Order = db.model('order')
// const User = db.model('user')

// describe('Order routes', () => {
//   beforeEach(() => {
//     return db.sync({ force: true })
//   })

//   describe('/api/orders/', () => {
//     const status = 'created'
//     const email = 'email@email.com'
//     let userId;

//     beforeEach(() => {
//       const users = {
//         email: email
//       }
//       return User.create(users)
//         .then(newUsers => {
//           userId = newUsers.id
//         })
//     })

//     beforeEach(() => {
//       const order = {
//         userId: userId,
//         status: status
//       }
//       return Order.create(order)
//         .then(orders => console.log('WHAT', typeof(orders.userId)))
//     })

//     it('GET /api/orders/:userid', () => {
//       return request(app)
//         .get('/api/orders/:userid')
//         .expect(200)
//         .then(res => {
//           expect(res.body).to.be.an('array')
//         })
//     })
//   })
// })