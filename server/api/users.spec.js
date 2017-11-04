/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        id: 1,
        isAdmin: false
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
    it('DELETE /api/users', () => {
      return request(app)
        .delete('/api/users/1')
        .expect(201)
    })
    it('ADMIN /api/users', () => {
      return request(app)
        .delete('/api/users/1')
        .expect(201)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
