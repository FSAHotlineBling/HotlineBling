import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const NEW_PRODUCT = 'NEW_PRODUCT'
// const DECREASE_PRODUCT = 'DECREASE_PRODUCT'

/**
 * ACTION CREATORS
 */
const getProducts = products => ({type: GET_PRODUCTS, products})
const updateProduct = product => ({type: UPDATE_PRODUCT, product})
const deleteProduct = id => ({type: DELETE_PRODUCT, id})
const newProduct = product => ({type: NEW_PRODUCT, product})
// const decreaseProduct = product => ({type: DECREASE_PRODUCT, product})

/**
 * THUNK CREATORS
 */
export const fetchProducts = () => dispatch => {
  return axios.get('/api/phones')
    .then(res => dispatch(getProducts(res.data)))
    .catch(err => dispatch(getProducts(err)))
}

export const putProduct = (productid, productObj, history) => (dispatch) => {
  axios.put(`/api/phones/${productid}`, productObj)
  .then(() => {
      axios.get(`/api/phones/${productid}`)
      .then(res => res.data)
      .then((product) => {
          const action = updateProduct(product);
          dispatch(action);
          history.push(`/`);
      })
      .catch();
  })
  .catch();
}

export const decreaseProductPut = (product) => (dispatch) => {
  const quantity = product.quantityAvailable - 1
  axios.put(`/api/phones/${product.id}`, {quantityAvailable: quantity})
  .then(() => {
    axios.get(`/api/phones/${product.id}`)
    .then(res => res.data)
    .then((product) => {
        const action = updateProduct(product);
        dispatch(action);
    })
    .catch();
})
  .catch();
}

export const increaseProductPut = (product) => (dispatch) => {
  const quantity = product.quantityAvailable + 1
  axios.put(`/api/phones/${product.id}`, {quantityAvailable: quantity})
  .then(() => {
    axios.get(`/api/phones/${product.id}`)
    .then(res => res.data)
    .then((product) => {
        const action = updateProduct(product);
        dispatch(action);
    })
    .catch();
})
  .catch();
}

export const destroyProduct = (id) => (dispatch) => {
  dispatch(deleteProduct(id));
  axios.delete(`/api/phones/${id}`)
  .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
};

export const createProduct = (name, price, quantityAvailable, imgUrl, description) => (dispatch) => {
  axios.post(`/api/phones`, { name, price, quantityAvailable, imgUrl, description })
      .then((res) => {
          return res.data
      })
      .then(product => {
          return product.id
      })
      .then(function (id) {
          axios.get(`/api/phones/${id}`)
              .then(res => res.data)
              .then((product) => {
                  const action = newProduct(product);
                  dispatch(action);
                  history.push(`/phones/${product.id}`);
              })
              .catch()
      })
      .catch();
}

/**
 * REDUCER
 */
export default function (products = [], action){
  switch (action.type){
    case GET_PRODUCTS:
      return action.products
    case NEW_PRODUCT:
      return products.concat(action.product);
    case UPDATE_PRODUCT:
      return products.map((product) => {
              return action.product.id === product.id ? action.product : product})
    // case DECREASE_PRODUCT:
    //     return products.map((product) => {
    //           return action.product.id === product.id ? action.product : product})
    case DELETE_PRODUCT:
      return products.filter(product => product.id !== action.id)
    default:
      return products
  }
}
