import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART'
const REMOVE_ITEM_IN_CART = 'REMOVE_ITEM_IN_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const CLEAR_CART = 'CLEAR_CART'
/**
 * ACTION CREATORS
 */
const addProductToCart = product => ({ type: ADD_PRODUCT_TO_CART, product })
const getProductsInCart = products => ({ type: GET_PRODUCTS_IN_CART, products })
const deleteItemInCart = id => ({ type: REMOVE_ITEM_IN_CART, id })
const updateQuantityInCart = product => ({ type: UPDATE_QUANTITY, product })
const afterCheckoutClearCart = () => ({ type: CLEAR_CART })
/**
 * THUNK CREATORS
 */
export const postCart = (productId, orderId) => dispatch => {
  return axios.post('/api/productorders', { productId, orderId })
    .then(res => {
      dispatch(addProductToCart(res.data))
    })
    .catch(err => dispatch(addProductToCart(err)))
}

export const fetchCart = orderId => dispatch => {
  return axios.get(`/api/productorders/${orderId}`)
    .then(res => {
      dispatch(getProductsInCart(res.data))
    })
    .catch(err => console.error('Get unsuccessful', err))
}

export const removeItemInCart = productId => dispatch => {
  dispatch(deleteItemInCart(productId))
  return axios.delete(`/api/productorders/${productId}`)
    .catch(err => console.error('Delete unsuccessful', err))
}

export const updateQuantity = (productId, orderId, quantity) => dispatch => {
  return axios.put('/api/productorders', {productId, orderId, quantity})
    .then(res => dispatch(updateQuantityInCart(res.data)))
    .catch(err => console.error('Update unsuccessful', err))
}

export const clearCart = () => dispatch => {
  dispatch(afterCheckoutClearCart())
}
/**
 * REDUCER
 */
export default function (cart = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_TO_CART:
      return [...cart, action.product]
    case GET_PRODUCTS_IN_CART:
      return action.products
    case REMOVE_ITEM_IN_CART:
      return cart.filter(product => product.id !== action.id);
    case UPDATE_QUANTITY:
      return cart.map(product => (
        action.product.id === product.id ? action.product : product
      ));
    case CLEAR_CART:
      return []
    default:
      return cart
  }
}

