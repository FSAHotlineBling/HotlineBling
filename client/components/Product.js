import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCart } from '../store'

/* -----------------    COMPONENT     ------------------ */

function Product (props){

  // constructor(props) {
  //   super(props);
  //   // this.addProductToCart = this.addProductToCart.bind(this)
  // }

    let product = props.product
    return (
      <div >
        <div className="media">
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
              <span>{product.quantity}</span>
            </h5>
          </NavLink>
          <div className="media-right media-middle">
            <button
              className="btn btn-default"
              onClick={() => props.addProductToCart(event, props)}
            >
              <span className="glyphicon glyphicon-remove" />
              Add to Cart!
          </button>
          </div>
        </div>
      </div>
    );


}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products, order }) => ({ products, order });

const mapDispatch = dispatch => {
  return {
    addProductToCart(event, props) {
      const productId = props.product.id
      const orderId = props.order.id
      event.stopPropagation();
      dispatch(putCart(productId, orderId));
    }
  }
}

export default connect(mapState, mapDispatch)(Product);
