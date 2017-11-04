import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_ORDER = 'CREATE_ORDER'
const GET_CREATED_ORDER = 'GET_CREATED_ORDER'
const RESET_ORDER = 'RESET_ORDER'


/**
 * ACTION CREATORS
 */
const createOrder = order => ({type: CREATE_ORDER, order})
const getCreatedOrder = order => ({type: GET_CREATED_ORDER, order})
export const resetOrder = () => ({type: RESET_ORDER})

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
  return axios.get(`/api/orders/${userid}`)
    .then(res => {
      dispatch(getCreatedOrder(res.data))
    })
    .catch(err => dispatch(getCreatedOrder(err)))
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
    default:
      return order
  }
}
