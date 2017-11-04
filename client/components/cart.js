import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart, removeItemInCart, increaseProductPut } from '../store'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.returnQuantityArray = this.returnQuantityArray.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const orderId = this.props.orderId
    this.props.fetchCartOrders(orderId)
  }

  returnQuantityArray(quantity) {
    let result = []
    for (let i = 1; i <= quantity; i++) {
      result.push(i)
    }
    return result
  }

  handleChange(event) {
    event.preventDefault()
    console.log(event)
  }

  render() {
    let quantity;
    let products = this.props.products
    return (
      <div id="cart-component">
        <h2>Your Cart</h2>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                <ul>
                  <li>{product.name}</li>
                  <li>{product.price}</li>
                  <label>Quantity:</label>
                  <select name="quantity" onChange={this.handleChange}>

                    {
                      quantity = this.returnQuantityArray(product.quantityAvailable)
                    }
                    {
                      quantity.map(num => {
                        return (<option key={num}>{num}</option>)
                      })
                    }
                  </select>
                </ul>
                <button
                  className="btn btn-default"
                  onClick = {() => this.props.removeItem(event, product)}
                  >Remove
                </button>
              </li>
            )
          })}
        </ul>
        <div className="media-right media-middle">
          <Link to="/checkout">Checkout</Link>
          <br />
          <Link to="/">Continue Shopping</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orderId: state.order.id,
    products: state.cart
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchCartOrders(orderId) {
      dispatch(fetchCart(orderId))
    },
    removeItem(event, product){
      event.stopPropagation();
      dispatch(removeItemInCart(product.id));
      dispatch(increaseProductPut(product));
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
