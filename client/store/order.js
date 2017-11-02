import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CREATE_ORDER = 'CREATE_ORDER'
const GET_CREATED_ORDER = 'GET_CREATED_ORDER'

/**
 * ACTION CREATORS
 */
const createOrder = order => ({type: CREATE_ORDER, order})
const getCreatedOrder = order => ({type: GET_CREATED_ORDER, order})

/**
 * THUNK CREATORS
 */
export const postOrder = (productId) => dispatch => {
  return axios.post('/api/orders', {productId})
    .then(res => {
      dispatch(createOrder(res.data))
    })
    .catch(err => dispatch(createOrder(err)))
  //!!!!!!! do we want to dispatch this to our store?
}

export const fetchCreatedOrder = userid => dispatch => {
  return axios.get(`/api/orders/${userid}`)
    .then(res => {
      dispatch(getCreatedOrder(res.data))
    })
    .catch(err => dispatch(getCreatedOrder(err)))

  //!!!!!!! do we want to dispatch this to our store?
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
    default:
      return order
  }
}
