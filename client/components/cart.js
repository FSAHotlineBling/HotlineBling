import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchCart } from '../store'

export class Cart extends Component {
  constructor(props){
    super(props)
    this.returnQuantityArray = this.returnQuantityArray.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  // componentDidMount(){
  //   const orderId = this.props.orderId
  //   console.log(this.props)
  //   this.props.fetchCartOrders(orderId)
  // }

  returnQuantityArray(quantity) {
    let result = []
    for(let i=1; i<= quantity; i++) {
      result.push(i)
    }
    return result    
  }

  handleChange(event) {
    event.preventDefault()
    console.log(event)
  }

  render() {
    const cart = {
      products: [{id: 1, name: 'Phone', quantityAvailable: 3, price: '$100.00', description: 'a phone'}]
    }

    let quantity;

  
    return (
      <div id="cart-component">
        <h2>Your Cart</h2>
        <ul>
          {cart.products.map(product => {
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
                        return(<option>{num}</option>)
                       }) 
                    }
                  </select>
                </ul>
              </li>
            )
          })}
        </ul>

      </div>
    )
  }
}

// const mapStateToProps = (state, ownProps) => {
//   console.log('STATE IN CART', state)
//   return {
//     orderId: state.order.id
//   }
// }


const mapDispatchToProps = dispatch => {
  return {
    fetchCartOrders(orderId) {
      dispatch(fetchCart(orderId))
    }
  }
}

const CartContainer = connect(null, mapDispatchToProps)(Cart)

export default CartContainer
