import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const Checkout = (props) => {
  return (
    <div>
      <form >
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

  }
}


const CheckoutForm = connect(mapState, null)(Checkout)
export default CheckoutForm
