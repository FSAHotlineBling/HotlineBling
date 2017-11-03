import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

//need total (can get from validation?)
//need to access individual order information - state.viewOrder
//then need array of products within order

export function OrderDetail(props) {

  const products = props.order.products
  const order = props.order
  console.log('PROPS ARE ', props)

  return (
    <div id="past-order-detail">
      <h2>Order {order.id} Detail</h2>
      <ul>
        <li>Ordered {order.date}</li>
        <li> Status: {order.status}</li>
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
                <li>{product.name}</li>
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
      </ul>

    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const orderId = Number(ownProps.match.params.orderId)
  return {
    order: state.viewOrder.find(order => order.id === orderId)
  }
}

const OrderDetailContainer = connect(mapStateToProps)(OrderDetail)

export default OrderDetailContainer
