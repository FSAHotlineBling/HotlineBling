import axios from 'axios'

//INITIAL STATE
let viewOrder = {
  orders: [],
  currentOrder: {}
}

//ACTION TYPES

const GET_USER_ORDERS = 'GET_USER_ORDERS'
const GET_ORDER = 'GET_ORDER'

//ACTION CREATORS

const getUserOrders = userOrders => ({type: GET_USER_ORDERS,
  userOrders })

const getOrder = order => ({type: GET_ORDER, order})


//THUNKS

export const fetchUserOrders = (userId) => {
  return function thunk(dispatch) {
    axios.get(`/api/orders/view/${userId}`)
      .then(res => res.data)
      .then(fetchedUserOrders => {
        const action = getUserOrders(fetchedUserOrders)
        dispatch(action)
      })
  }
}

export const fetchOrder = (userId, orderId) => dispatch => {
  return axios.get(`/api/orders/view/${userId}/${orderId}`)
    .then(res => dispatch(getOrder(res.data)))
    .catch(err => console.error(err))
}

//REDUCER

const orderReducer = (state = viewOrder, action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return Object.assign({}, state, {orders: action.userOrders})
    case GET_ORDER:
      return Object.assign({}, state, {currentOrder: action.order})
    default: return state;
  }
}

export default orderReducer
