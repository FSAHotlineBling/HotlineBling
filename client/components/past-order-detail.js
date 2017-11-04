import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrder } from '../store'

//need total (can get from validation?)
//need to access individual order information - state.viewOrder
//then need array of products within order

// need each line item from productOrders with orderId matching
// then for each line item => sum += quant*price
// price needs to be gotten from product table

export class OrderDetail extends Component {


  componentDidMount() {
    const orderId = Number(this.props.match.params.orderId)
    const userId = Number(this.props.user.id)
    this.props.fetchOrder(userId, orderId)

  }

  render() {

    const order = this.props.order
    const products = order.products ? order.products : []

    let total = 0
    if (order.products) {
      products.forEach(product => {
        total += (Number(product.price) * Number(product.productOrders.quantity))
        return total
      })
    }


    return (
      <div id="past-order-detail">
        <h2>Order {order.id} Detail</h2>
        <ul>
          <li>Ordered {order.dateCreated}</li>
          <li> Status: {order.status}</li>
        </ul>
        <ul>
          <li>Ship to:</li>
          <li> {order.email} </li>
          <li> {order.address} </li>
          <li> {order.city}, {order.state} {order.zip} </li>
        </ul>
        <ul>
          {console.log('PRODUCTS', products)}
          {products.map(product => {
            console.log('PRODUCT', product)
            return (
              <li key={product.id}>
                <ul>
                  <li>
                    <Link to={`/phones/${product.id}`}>{product.name}</Link>
                  </li>
                  <li><img src={product.imageUrl} /></li>
                  <li>quantity: {product.productOrders.quantity}</li>
                  <li>${product.price}</li>
                  <li>
                    <Link to={`/products/${product.id}/review-product`}>
                      <button>Review This Product</button>
                    </Link>
                  </li>
                </ul>
              </li>
            )
          })}
          <li>Order Total: ${total.toFixed(2)}</li>
        </ul>
      </div>
    )

  }
}

const mapStateToProps = state => {
  return {
    order: state.viewOrder.currentOrder,
    user: state.user
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchOrder(userId, orderId) {
      dispatch(fetchOrder(userId, orderId))
    }
  }
}
const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

export default OrderDetailContainer
