import React, { Component } from 'react'
import {connect} from 'react-redux'
import {updateOrder, updateQuantityAvailable, fetchCart} from '../store'
/**
 * COMPONENT
 */
class Checkout extends Component {
  componentDidMount() {
    this.props.loadCart(this.props.order.id)
  }

  render (){
    return (
      <div>
        <form onSubmit={event => {
          this.props.handleSubmit(event, this.props.order)
          this.props.cart.map(productInCart => {
            this.props.update(productInCart, productInCart.productOrders.quantity)
          })
        }}>
          <div>
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" placeholder="email"/>
          </div>
          <div>
            <label htmlFor="address"><small>Address</small></label>
            <input name="streetaddress" type="streetaddress" placeholder="street address" />
            <input name="city" type="city" placeholder="city" />
            <input name="state" type="state" placeholder="state" />
            <input name="zip" type="zip" placeholder="zip" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    cart: state.cart
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event, order) {
      event.preventDefault();
      dispatch(updateOrder(event.target.streetaddress.value, event.target.city.value, event.target.zip.value, event.target.state.value, event.target.email.value, order.id));
    },
    loadCart(orderId){
      dispatch(fetchCart(orderId))
    },
    update(product, num){
      dispatch(updateQuantityAvailable(product, num))
    }
  }
}

const CheckoutForm = connect(mapState, mapDispatch)(Checkout)
export default CheckoutForm
