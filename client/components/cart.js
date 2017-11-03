import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart } from '../store'

export class Cart extends Component {

  componentDidMount(){
    const orderId = this.props.orderId
    console.log(this.props)
    this.props.fetchCartOrders(orderId)
  }

  render() {
    return (
      <div id="cart-component">
        <h2>Your Cart</h2>
        
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('STATE IN CART', state)
  return {
    orderId: state.order.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCartOrders(orderId) {
      dispatch(fetchCart(orderId))
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
