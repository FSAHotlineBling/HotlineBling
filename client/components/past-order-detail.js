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
    console.log(admin)

    let total = 0
    if (order.products) {
      products.forEach(product => {
        total += (Number(product.price) * Number(product.productOrders.quantity))
        return total
      })
    }


    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-2"/>
            <div className="col-sm-8">
              <div id="past-order-detail">
              <div class="card">
                <div class="card-block">
                  <h4 class="card-title">Order {order.id} Detail</h4>
                  <p class="card-text">Ordered {order.dateCreated}</p>
                  <p class="card-text"><small class="text-muted">Status: {order.status}</small></p>
                  {admin &&
                    (
                        <select
                          name="status"
                          onChange={this.handleChange}
                          className="form-control"
                        >
                          <option value="default">Change Order Status</option>
                          <option>Created</option>
                          <option>Processing</option>
                          <option>Cancelled</option>
                          <option>Completed</option>
                          <option>Delivered</option>
                        </select>
                    )
                  }
                  <p class="card-text">Ship to:</p>
                  <p class="card-text">{order.email}</p>
                  <p class="card-text">{order.address}</p>
                  <p class="card-text">{order.city}, {order.state} {order.zip} </p>
                </div>
                  {products.map(product => {
                    return (
                    <div key={product.id} className="card mb-3">
                      <img className="card-img-top" src={product.imageUrl} alt="phone image cap" />
                      <div className="card-block">
                        <Link
                          className="media-body"
                          activeClassName="active"
                          to={`/phones/${product.id}`}><h4 className="card-title">{product.name}</h4></Link>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text">${product.price}</p>
                        <p className="card-text">Quantity: {product.productOrders.quantity}</p>
                        <p className="card-text"><small className="text-muted">Quantity Available: {product.quantityAvailable}</small></p>
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
                      </div>
                    </div>
                    )
                  })}
                  <li>Order Total: ${total.toFixed(2)}</li>

                {
                  (order.status === 'processing' || order.status === 'created') &&
                  (
                    <button onClick={this.cancelOrder}>Cancel This Order</button>
                  )
                }
              </div>

      </div>
      </div>
      <div className="col-sm-8" />
      </div>
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
