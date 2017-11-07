/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchCart, postCart} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators in cart', () => {
  let store
  let mockAxios
  let orderId = 1
  let productId = 2
  const inititalState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(inititalState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchCart', () => {
    it('dispatches the GET PRODUCTS IN CART action', () => {
      const fakeProduct = {productId: productId, orderId: orderId, quantity: 1}
      mockAxios.onGet(`/api/productorders/${orderId}`).replyOnce(200, fakeProduct)
      return store.dispatch(fetchCart(orderId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PRODUCTS_IN_CART')
          expect(actions[0].products).to.be.deep.equal(fakeProduct)
        })
    })
  })

  describe('postCart', () => {
    it('dispatches the ADD PRODUCT TO CART action', () => {
      const fakeProduct = {productId: productId, orderId: orderId, quantity: 1}
      mockAxios.onPost('/api/productorders', {productId, orderId}).replyOnce(200, fakeProduct)
      return store.dispatch(postCart(productId, orderId))
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('ADD_PRODUCT_TO_CART')
          expect(actions[0].product).to.be.deep.equal(fakeProduct)
        })
    })
  })
})