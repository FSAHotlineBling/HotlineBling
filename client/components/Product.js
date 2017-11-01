import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { putCart } from '../store'

/* -----------------    COMPONENT     ------------------ */

class Product extends React.Component {

  constructor(props) {
    super(props);
    this.addProductToCart = this.addProductToCart.bind(this)
  }

  render() {
    let product = this.props.product
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
              onClick={this.addProductToCart}
              >
            <span className="glyphicon glyphicon-remove" />
            Add to Cart!
          </button>
        </div>
        </div>
      </div>
    );
  }

  addProductToCart(event){
    console.log('props',this.props, 'state', this.state)
    const productId = this.props.product.id
    // const orderId
    event.stopPropagation();
    // putCart();
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ products, order }) => ({ products, order });


export default connect(mapState)(Product);
