import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { postCart, postOrder, decreaseProductPut } from '../store'
import PhoneReviews from './phone-reviews.js'

/* -----------------    COMPONENT     ------------------ */

export function Product (props){

    let product = props.product
    return (
        <div className="card mb-3">
          <img className="card-img-top" src={product.imageUrl} alt="Card image cap"/>
            <div className="card-block">
            <NavLink
                className="media-body"
                activeClassName="active"
                to={`/phones/${product.id}`}><h4 className="card-title">{product.name}</h4></NavLink>
              <p className="card-text">{product.description}</p>
              <p className="card-text">New low Price! {product.price}</p>
              <p className="card-text"><small className="text-muted">Quantity Available: {product.quantityAvailable}</small></p>
              {
                product !== undefined && product.quantityAvailable >= 1 ? <button
                  className="btn btn-default"
                  onClick={() => props.addProductToCart(event, props)}
                >
                  <span className="glyphicon glyphicon-remove" />
                  Add to Cart!
                  </button> : <p> More Coming Soon </p>
          }
        </div>
        </div>
    );
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products, order, user }) => ({ products, order, user });

const mapDispatch = dispatch => {
  return {
    addProductToCart(event, props) {
      const productId = props.product.id
      const userId = props.user ? props.user.id : null
      let orderId
      if (props.order === null || Object.keys(props.order).length === 0){
        dispatch(postOrder(productId, userId))
      } else {
        orderId = props.order.id ? props.order.id : props.order.orderId
        dispatch(postCart(productId, orderId));
      }
      dispatch(decreaseProductPut(props.product))
      event.stopPropagation();
    }
  }
}

export default connect(mapState, mapDispatch)(Product);
