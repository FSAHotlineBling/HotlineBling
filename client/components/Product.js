import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { postCart, postOrder, decreaseProductPut } from '../store'

/* -----------------    COMPONENT     ------------------ */

export function Product (props){

    let product = props.product
    return (
      <div >
        <div className="media">
          <div><img src={product.imageUrl} /></div>
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/phones/${product.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{product.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{product.description}</span>
            </h5>
            <h5 className="tucked">
              <span>{product.price}</span>
            </h5>
            <h5 className="tucked">
              <span>Quantity Available: {product.quantityAvailable}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">
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
        orderId = props.order.orderId
        dispatch(postCart(productId, orderId));
      }
      dispatch(decreaseProductPut(props.product))
      event.stopPropagation();
    }
  }
}

export default connect(mapState, mapDispatch)(Product);
