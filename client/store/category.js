import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'


/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})

/**
 * THUNK CREATORS
 */
export const fetchCategories2 = () => dispatch => {
  return axios.get('/api/category')
    .then(res => dispatch(getCategories(res.data)))
    .catch(err => dispatch(getCategories(err)))
}


/**
 * REDUCER
 */
export default function (categories = [], action){
  switch (action.type){
    case GET_CATEGORIES:
      return action.categories
    default:
      return categories
  }
}
