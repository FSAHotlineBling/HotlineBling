import React from 'react'
import {connect} from 'react-redux'
import {updateOrder} from '../store'
/**
 * COMPONENT
 */
const Checkout = (props) => {
  return (
    <div>
      <form onSubmit={event => props.handleSubmit(event, props.order)}>
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

const mapState = (state) => {
  return {
    order: state.order
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(event, order) {
      event.preventDefault();
      dispatch(updateOrder(event.target.streetaddress.value, event.target.city.value, event.target.zip.value, event.target.state.value, event.target.email.value, order.id));
    }
  }
}

const CheckoutForm = connect(mapState, mapDispatch)(Checkout)
export default CheckoutForm
