import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_ORDER = 'CREATE_ORDER'
const GET_CREATED_ORDER = 'GET_CREATED_ORDER'
const RESET_ORDER = 'RESET_ORDER'
const UPDATE_ORDER = 'UPDATE_ORDER'
const CREATE_ORDER_NO_PRODUCT = 'CREATE_ORDER_NO_PRODUCT'

/**
 * ACTION CREATORS
 */
const createOrder = order => ({type: CREATE_ORDER, order})
const getCreatedOrder = order => ({type: GET_CREATED_ORDER, order})
export const resetOrder = () => ({type: RESET_ORDER})
const updateTheOrder = cartOrder => ({type: UPDATE_ORDER, cartOrder})
const createOrderNoProduct = order => ({type: CREATE_ORDER_NO_PRODUCT, order})

/**
 * THUNK CREATORS
 */
export const postOrder = (productId, userId) => dispatch => {
  return axios.post('/api/orders', {productId, userId})
    .then(res => {
      dispatch(createOrder(res.data))
    })
    .catch(err => dispatch(createOrder(err)))
}

export const fetchCreatedOrder = userid => dispatch => {
  console.log('USERID IS', userid)
  return axios.get(`/api/orders/${userid}`)
    .then(res => {
      console.log('res.data IS', res.data)
      dispatch(getCreatedOrder(res.data))
    })
    .catch(err => dispatch(getCreatedOrder(err)))
}

export const updateOrder = (address, city, zip, state, email, orderId) => dispatch => {
  return axios.put(`/api/orders/${orderId}`, {address, city, zip, state, email, id: orderId, status: 'processing'})
    .then(res => {
      dispatch(updateTheOrder(res.data))
      history.push('/thankyou')
    })
    .catch(err => console.error('Updating order unsuccessful', err))
}

export const createOrderOnCartClick = () => dispatch => {
  return axios.post('/api/orders/noproduct')
    .then(res => dispatch(createOrderNoProduct(res.data)))
    .catch(err => console.error('Creating order after clicking cart was unsuccessful', err))
}
/**
 * REDUCER
 */
export default function (order = {}, action){
  switch (action.type){
    case CREATE_ORDER:
      return action.order
      //won't this return an empty object or last created object?
    case GET_CREATED_ORDER:
      return action.order
    case RESET_ORDER:
      return ({})
    case UPDATE_ORDER:
      return action.cartOrder.id === order.id ? action.cartOrder : order
    case CREATE_ORDER_NO_PRODUCT:
      return action.order
    default:
      return order
  }
}
