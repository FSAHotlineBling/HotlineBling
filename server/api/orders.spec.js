/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/phones/', () => {
    const name = 'New phone'
    const quantity = 3
    let prodId;

    beforeEach(() => {
      return Product.create({
        name: name,
        quantityAvailable: quantity
      })
      .then(product => {
        prodId = product.id
      })
    })

    it('adds cookie with cartId to session when sending POST to /api/users', () => {
      return request(app)
        .post('/api/orders')
        .send({productId: prodId})
        .expect(200)
        .then(res => {
          let cookies = res.headers['set-cookie']
          .map(function(r){
            return r.replace("; path=/; httponly","")
          }).join("; ");
          let cartId = cookies[7]*1
          expect(cartId).to.equal(res.body.orderId)
        })
    })
  })
})



