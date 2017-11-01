import axios from 'axios'

//INITIAL STATE

const orderState = {
  currentUserOrders: []
}

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
    axios.get(`/api/orders/${userId}`)
      .then(res => res.data)
      .then(fetchedUserOrders => {
        const action = getUserOrders(fetchedUserOrders)
        dispatch(action)
      })
  }
}

//REDUCER

const orderReducer = (state = orderState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return {...state, currentUserOrders: action.userOrders}
    default: return state;
  }
}

export default orderReducer

