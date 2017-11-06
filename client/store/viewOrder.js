import axios from 'axios'

//INITIAL STATE
let viewOrder = {
  userOrders: [],
  currentOrder: {},
  adminOrders: []
}

//ACTION TYPES

const GET_USER_ORDERS = 'GET_USER_ORDERS'
const GET_ORDER = 'GET_ORDER'
const ADMIN_GET_ALL_ORDERS = 'ADMIN_GET_ALL_ORDERS'
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

//ACTION CREATORS

const getUserOrders = userOrders => ({type: GET_USER_ORDERS,
  userOrders })

const getOrder = currentOrder => ({type: GET_ORDER, currentOrder})

const adminGetAllOrders = allOrders => ({type: ADMIN_GET_ALL_ORDERS, allOrders})

const updateOrderStatus = order => ({type: UPDATE_ORDER_STATUS, order})


//THUNKS

export const fetchUserOrders = (userId) => {
  return function thunk(dispatch) {
    axios.get(`/api/orders/view/${userId}`)
      .then(res => res.data)
      .then(fetchedUserOrders => {
        const action = getUserOrders(fetchedUserOrders)
        dispatch(action)
      })
      .catch(err => console.error(err))
  }
}

export const fetchOrder = (userId, orderId) => dispatch => {
  return axios.get(`/api/orders/view/${userId}/${orderId}`)
    .then(res => dispatch(getOrder(res.data)))
    .catch(err => console.error(err))
}

export const fetchAllOrders = () => dispatch => {
  return axios.get(`/api/orders/view`)
    .then(res => dispatch(adminGetAllOrders(res.data)))
    .catch(err => console.error(err))
}

export const putOrderStatus = (orderId, update) => dispatch => {
  return axios.put(`/api/orders/${orderId}`, update)
    .then(res => dispatch(updateOrderStatus(res.data)))
    .catch(err => console.error(err))
}

//REDUCER

const orderReducer = (state = viewOrder, action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return Object.assign({}, state, {userOrders: action.userOrders})
    case GET_ORDER:
      return Object.assign({}, state, {currentOrder: action.currentOrder})
    case ADMIN_GET_ALL_ORDERS:
      return Object.assign({}, state, {adminOrders: action.allOrders})
    case UPDATE_ORDER_STATUS:
      return Object.assign({}, state, {currentOrder: action.order})

    default: return state;
  }
}

export default orderReducer
