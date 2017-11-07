import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchOrder, putOrderStatus } from '../store'

//need total (can get from validation?)

export class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.cancelOrder = this.cancelOrder.bind(this)
  }

  componentDidMount() {
    const orderId = this.props.orderId
    const userId = this.props.user.id
    this.props.fetchOrder(userId, orderId)

  }

  handleChange(event) {
    event.preventDefault()
    const newStatus = event.target.value.toLowerCase()
    if (newStatus !== 'default') {
      this.props.putOrderStatus(this.props.orderId, { status: newStatus })
      if (newStatus === 'completed' || newStatus === 'delivered'){
        emailjs.send('gmail', `order_${newStatus}`, {
        email: this.props.order.email
        })
      }
    }
  }

  cancelOrder(event) {
    event.preventDefault()
    this.props.putOrderStatus(this.props.orderId, { status: 'cancelled' })
  }

  render() {

    const order = this.props.order
    const products = order.products ? order.products : []
    const admin = this.props.user.isAdmin

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
          {admin &&
            (
              <li>
                <select
                  name="status"
                  onChange={this.handleChange}
                >
                  <option value="default">Change Order Status</option>
                  <option>Created</option>
                  <option>Processing</option>
                  <option>Cancelled</option>
                  <option>Completed</option>
                  <option>Delivered</option>
                </select>
              </li>
            )
          }
        </ul>
        <ul>
          <li>Ship to:</li>
          <li> {order.email} </li>
          <li> {order.address} </li>
          <li> {order.city}, {order.state} {order.zip} </li>
        </ul>
        <ul>
          {products.map(product => {
            return (
              <li key={product.id}>
                <ul>
                  <li>
                    <Link to={`/phones/${product.id}`}>{product.name}</Link>
                  </li>
                  <li><img src={product.imageUrl} /></li>
                  <li>quantity: {product.productOrders.quantity}</li>
                  <li>${product.price}</li>
                  {
                    (order.status === 'completed' || order.status === 'delivered') &&
                    (
                      <li>
                        <Link to={`/products/${product.id}/review-product`}>
                          <button>Review This Product</button>
                        </Link>
                      </li>
                    )
                  }
                </ul>
              </li>
            )
          })}
          <li>Order Total: ${total.toFixed(2)}</li>
        </ul>
        {
          (order.status === 'processing' || order.status === 'created') &&
          (
            <button onClick={this.cancelOrder}>Cancel This Order</button>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    order: state.viewOrder.currentOrder,
    user: state.user,
    orderId: ownProps.match.params.orderId
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchOrder(userId, orderId) {
      dispatch(fetchOrder(userId, orderId))
    },
    putOrderStatus(orderId, update) {
      dispatch(putOrderStatus(orderId, update))
    }
  }
}
const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

export default OrderDetailContainer
