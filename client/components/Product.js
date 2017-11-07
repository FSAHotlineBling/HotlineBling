import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Popup from 'react-popup';
import { postCart, postOrder, decreaseProductPut } from '../store'
import PhoneReviews from './phone-reviews.js'

/* -----------------    COMPONENT     ------------------ */

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {showme: true}
    this.changeText = this.changeText.bind(this)
  }
  
  changeText() {
    this.setState({showme: false})
  }

  render() {
    const button = this.state.showme ? <button className="btn btn-default" 
    onClick={event => {
      {this.changeText()}
      this.props.addProductToCart(event, this.props)
    }}
  >
    <span className="glyphicon glyphicon-remove" />
    Add to Cart!
  </button> : <p>Your item has been added to your cart</p>
    let product = this.props.product
    return (
      <div className="card mb-3">
        <img className="card-img-top" src={product.imageUrl} alt="Card image cap" />
        <div className="card-block">
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/phones/${product.id}`}><h4 className="card-title">{product.name}</h4></NavLink>
          <p className="card-text">{product.description}</p>
          <p className="card-text">New low Price! {product.price}</p>
          <p className="card-text"><small className="text-muted">Quantity Available: {product.quantityAvailable}</small></p>
          {
            product !== undefined && product.quantityAvailable >= 1 ? button : <p> More Coming Soon </p>
          }
        </div>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapState = (state) => {
  return {
    products: state.products,
    order: state.order,
    user: state.user
  }
};

const mapDispatch = dispatch => {
  return {
    addProductToCart(event, props) {
      const productId = props.product.id
      const userId = props.user ? props.user.id : null
      let orderId
      if (props.order === null || Object.keys(props.order).length === 0) {
        dispatch(postOrder(productId, userId))
      } else {
        orderId = props.order.id ? props.order.id : props.order.orderId
        dispatch(postCart(productId, orderId));
      }
      event.stopPropagation();
    }
  }
}

export default connect(mapState, mapDispatch)(Product);
