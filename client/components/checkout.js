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
                    <input name="city" type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
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
