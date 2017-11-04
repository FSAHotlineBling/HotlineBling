import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART'
/**
 * ACTION CREATORS
 */
const addProductToCart = product => ({type: ADD_PRODUCT_TO_CART, product})
const getProductsInCart = products => ({type: GET_PRODUCTS_IN_CART, products})
/**
 * THUNK CREATORS
 */
export const postCart = (productId, orderId) => dispatch => {
  return axios.post('/api/productorders', { productId, orderId })
    .then(res => {
      dispatch(addProductToCart(res.data))
    })
    //QUESTION ??????
    .catch(err => dispatch(addProductToCart(err)))
}

export const fetchCart = orderId => dispatch => {
  return axios.get(`/api/productorders/${orderId}`)
    .then(res => {
      dispatch(getProductsInCart(res.data))
    })
    .catch(err => console.error('Get unsuccessful', err))
}

/**
 * REDUCER
 */
export default function (cart = [], action){
  switch (action.type){
    case ADD_PRODUCT_TO_CART:
      return [...cart, action.product]
    case GET_PRODUCTS_IN_CART:
      return action.products
    default:
      return cart
  }
}
