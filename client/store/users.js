import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'
const MAKE_ADMIN = 'MAKE_ADMIN'

/**
 * ACTION CREATORS
 */
const getUsers= users=> ({type: GET_USERS, users})
const updateUser = user => ({type: UPDATE_USER, user})
const deleteUser = id => ({type: DELETE_USER, id})
const makeAdmin = user => ({type: MAKE_ADMIN, user})

/**
 * THUNK CREATORS
 */
export const fetchUsers = () => dispatch => {
  return axios.get('/api/users')
    .then(res => dispatch(getUsers(res.data)))
    .catch()
}

export const putUser = (userid, userObj, history) => (dispatch) => {
  axios.put(`/api/users/${userid}`, userObj)
  .then(() => {
      axios.get(`/api/users/${userid}`)
      .then(res => res.data)
      .then((user) => {
          const action = updateUser(user);
          dispatch(action);
          history.push(`/`);
      })
      .catch();
  })
  .catch();
}

export const adminUser = (userid, history) => (dispatch) => {
  axios.put(`/api/users/admin/${userid}`)
  .then(() => {
    axios.get(`/api/users/${userid}`)
    .then(res => res.data)
    .then((user) => {
        const action = makeAdmin(user);
        dispatch(action);
    })
    .catch();
})
  .catch();
}

export const destroyUser = (id) => (dispatch) => {
  dispatch(deleteUser(id));
  axios.delete(`/api/users/${id}`)
  .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

/**
 * REDUCER
 */
export default function (users = [], action){
  switch (action.type){
    case GET_USERS:
      return action.users
    case UPDATE_USER:
      return users.map((user) => {
              return action.user.id === user.id ? action.user : user})
    case MAKE_ADMIN:
      return users.map((user) => {
            return action.user.id === user.id ? action.user : user})
    case DELETE_USER:
      return users.filter(user => user.id !== action.id)
    default:
      return users
  }
}
