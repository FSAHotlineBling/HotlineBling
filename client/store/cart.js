import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
const GET_PRODUCTS = 'GET_PRODUCTS'
/**
 * ACTION CREATORS
 */
const addProductToCart = product => ({type: ADD_PRODUCT_TO_CART, product})
const getProducts = products => ({type: GET_PRODUCTS, products})
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
      dispatch(getProducts(res.data))
    })
    .catch(err => console.error('Get unsuccessful', err))
}

/**
 * REDUCER
 */
export default function (cart = { products: []}, action){
  switch (action.type){
    case ADD_PRODUCT_TO_CART:
      return Object.assign({}, cart, {product: action.products})
    case GET_PRODUCTS:
      return Object.assign({}, cart, {products: action.products})
    default:
      return cart
  }
}
