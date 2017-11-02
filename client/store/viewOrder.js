import axios from 'axios'


//ACTION TYPES

const GET_USER_ORDERS = 'GET_USER_ORDERS'

//ACTION CREATORS

const getUserOrders = (userOrders) => ({
  type: GET_USER_ORDERS,
  userOrders
})

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

//REDUCER

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.userOrders
    default: return state;
  }
}

export default orderReducer
