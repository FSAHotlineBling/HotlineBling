/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/phones/', () => {
    const name = 'New phone'
    const quantity = 3

    beforeEach(() => {
      return Product.create({
        name: name,
        quantityAvailable: quantity
      })
    })

    it('GET /api/phones', () => {
      return request(app)
        .get('/api/phones')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].name).to.be.equal(name)
          expect(res.body[0].quantityAvailable).to.be.equal(quantity)          
        })
    })
  })
})