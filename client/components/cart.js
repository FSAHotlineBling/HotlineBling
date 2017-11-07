import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart, removeItemInCart, updateQuantity, createOrderOnCartClick } from '../store'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.returnQuantityArray = this.returnQuantityArray.bind(this)
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

  render() {
    let quantity;
    let products = this.props.products
    let orderId = this.props.orderId
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8" >
              <div id="cart-component">
                <h2>Your Cart</h2>
                <ul>
                  {products.map(product => {
                    let id = product.id ? product.id : product.productId
                    return (
                      <div key={id} className="card">
                        <h3 className="card-header">{product.name}</h3>
                        <div className="card-block">
                          <h4 className="card-title">{product.price}</h4>
                          <p className="card-text">{product.description}</p>
                          <label>Quantity:</label>
                          <select name="quantity" onChange={event => this.props.handleChange(event, product, orderId)}>

                            {
                              quantity = this.returnQuantityArray(product.quantityAvailable)
                            }
                            {
                              quantity.map(num => {
                                return (<option key={num}>{num}</option>)
                              })
                            }
                          </select>
                          <button
                            className="btn btn-default"
                            onClick={event => this.props.removeItem(event, product)}
                          >Remove
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </ul>
                <div className="media-right media-middle">
                  <Link to="/checkout">Checkout</Link>
                  <br />
                  <Link to="/">Continue Shopping</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2" />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const orderId = state.order.id ? state.order.id : state.order.orderId
  return {
    orderId: orderId,
    products: state.cart
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchCartOrders(orderId) {
      orderId ? dispatch(fetchCart(orderId)) : dispatch(createOrderOnCartClick())
    },
    removeItem(event, product) {
      dispatch(removeItemInCart(product.id));
    },
    handleChange(event, product, orderId) {
      const productId = product.id
      const quantity = event.target.value
      dispatch(updateQuantity(productId, orderId, quantity))
    }
  }
}

const CartContainer = connect(mapStateToProps, mapDispatchToProps)(Cart)

export default CartContainer
