import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

/**
 * ACTION CREATORS
 */
const addProductToCart = product => ({type: ADD_PRODUCT_TO_CART, product})

/**
 * THUNK CREATORS
 */
export const putCart = (productId, orderId) => dispatch => {
  return axios.post('/api/productorders', { productId, orderId })
    .then(res => {
      dispatch(addProductToCart(res.data))
    })
    .catch(err => dispatch(addProductToCart(err)))
}

/**
 * REDUCER
 */
export default function (cart = {}, action){
  switch (action.type){
    case ADD_PRODUCT_TO_CART:
      return Object.assign({}, cart, {cartId: action.orderId})
    default:
      return cart
  }
}
