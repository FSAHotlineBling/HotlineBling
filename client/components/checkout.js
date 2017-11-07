import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateOrder, updateQuantityAvailable, fetchCart, clearCart } from '../store'
/**
 * COMPONENT
 */
class Checkout extends Component {
  componentDidMount() {
    const orderId = this.props.order.id ? this.props.order.id : this.props.order.orderId
    this.props.loadCart(orderId)
  }

  render() {
    console.log('CART', this.props.cart)
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2" />
            <div className="col-sm-8">
            <form onSubmit={event => {
                this.props.handleSubmit(event, this.props.order)
                this.props.cart.map(productInCart => {
                  this.props.update(productInCart, productInCart.productOrders.quantity)
                })
              }}>

                  <div className="form-group row">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" id="inputEmail4" placeholder="Email" />
                  </div>
                  <div className="form-group row">
                    <label>Address</label>
                    <input name="streetaddress" type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                  </div>
                  <div className="form-group row">
                    <input name="city" type="text" className="form-control" id="inputAddress2" placeholder="City" />
                  </div>
                  <div className="form-group row">
                    <input name="state" type="text" className="form-control" id="inputCity" placeholder="State"/>
                  </div>
                  <div className="form-group row">
                    <input name="zip" type="text" className="form-control" id="inputZip" placeholder="Zip"/>
                  </div>
                  <button type="submit" className="btn">Submit</button>
              </form>
            </div>
            <div className="col-sm-3" />
          </div>
        </div>
    )
  }
}

const mapState = (state) => {
  return {
    order: state.order,
    cart: state.cart,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event, order) {
      event.preventDefault();
      const orderId = order.id ? order.id : order.orderId
      const streetaddress = event.target.streetaddress.value
      const city = event.target.city.value
      const state = event.target.state.value
      const email = event.target.email.value
      const zip = event.target.zip.value

      dispatch(updateOrder(streetaddress, city, zip, state, email, orderId));
      dispatch(clearCart())
      emailjs.send('gmail', 'order_confirmation', {
        id: orderId,
        email: email
      })
    },
    loadCart(orderId) {
      dispatch(fetchCart(orderId))
    },
    update(product, num) {
      dispatch(updateQuantityAvailable(product, num))
    }
  }
}

const CheckoutForm = connect(mapState, mapDispatch)(Checkout)
export default CheckoutForm
