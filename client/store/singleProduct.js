// import axios from 'axios'
// //ACTION TYPES


// //ACTION CREATORS
// export const updateProduct = (product) => {
//     return {
//       type: UPDATE_PRODUCT,
//       product
//   };
// }

// export const deleteProduct = (id) => {
//     return {
//         type: DELETE_PRODUCT,
//         id
//     }
// }

// //THUNKS
// export const putProduct = (productid, productObj, history) => (dispatch) => {
//     axios.put(`/api/phones/${productid}`, productObj)
//     .then(() => {
//         axios.get(`/api/phones/${productid}`)
//         .then(res => res.data)
//         .then((product) => {
//             const action = updateProduct(product);
//             dispatch(action);
//             history.push(`/`);
//         })
//         .catch();
//     })
//     .catch();
// }

// export const destroyProduct = (id) => (dispatch) => {
//     dispatch(deleteProduct(id));
//     axios.delete(`/api/phones/${id}`)
//     .catch(err => console.error(`Removing user: ${id} unsuccesful`, err));
// };

// //REDUCER
// const productReducer = (products = [], action) => {
//     switch (action.type) {
//         case UPDATE_PRODUCT:
//             return products.map((product) => {
//                     return action.product.id === product.id ? action.product : product});
//         case DELETE_PRODUCT:
//             return products.filter(product => product.id !== action.id);
//         default:
//             return products;
//     }
// }

// export default productReducer;
