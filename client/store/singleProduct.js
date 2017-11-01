import axios from 'axios'
//ACTION TYPES
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//ACTION CREATORS
export const updateProduct = (product) => {
    return {
      type: UPDATE_PRODUCT,
      product
  };
}

//THUNKS
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

//REDUCER
const productReducer = (products = [], action) => {
    switch (action.type) {
        case UPDATE_PRODUCT:
            return products.map((product) => {
                    return action.product.id === product.id ? action.product : product})
        default:
            return products;
    }
}

export default productReducer;
