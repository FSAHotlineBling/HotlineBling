import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CATEGORIES = 'GET_CATEGORIES'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'
const NEW_CATEGORY = 'NEW_CATEGORY'

/**
 * ACTION CREATORS
 */
const getCategories = categories => ({type: GET_CATEGORIES, categories})
const deleteCategory = id => ({type: DELETE_CATEGORY, id})
const newCategory = category => ({type: NEW_CATEGORY, category})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () => dispatch => {
  return axios.get('/api/categories')
    .then(res => dispatch(getCategories(res.data)))
    .catch(err => dispatch(getCategories(err)))
}

export const destroyCategory = (categoryId, productId) => (dispatch) => {
  axios.delete(`/api/categories/${productId}/${categoryId}`)
  .catch(err => console.error(`Removing category: unsuccesful`, err));
};

export const createCategory = (value, category) => (dispatch) => {
  axios.post(`/api/categories`, { value, category })
      .then((res) => {
          return res.data
      })
      .then(createdCategory => {
        const action = newCategory(createdCategory);
        dispatch(action);
        history.goBack();
      })
      .catch();
}

export const addCategory = (categoryId, productId) => (dispatch) => {
  axios.post(`/api/categories/add`, {categoryId, productId})
      .then((res) => {
          return res.data
      })
      .catch();
}

/**
 * REDUCER
 */
export default function (categories = [], action){
  switch (action.type){
    case GET_CATEGORIES:
      return action.categories
    case NEW_CATEGORY:
      return categories.concat(action.category);
    case UPDATE_CATEGORY:
      return categories.map((category) => {
              return action.category.id === category.id ? action.category : category})
    default:
      return categories
  }
}
