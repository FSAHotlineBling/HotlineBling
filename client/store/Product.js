import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch => {
  return axios.get('/api/phones')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => dispatch(getProducts(err)))
}

/**
 * REDUCER
 */
export default function (products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    default:
      return products
  }
}
