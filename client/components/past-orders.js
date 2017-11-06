import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserOrders, fetchAllOrders } from '../store'


/*
STILL NEED TO DO THIS
(side note: will we need some sort of security in place to make sure that just anybody can't go to /api/orders/userId & see all past orders? how to implement that?)
 */

export class PastOrders extends Component {


  componentDidMount() {
    const userId = this.props.userId //userId param in URL
    const user = this.props.user

    // if URL route is /users/admin/orders & user is actaully admin
    if (userId === 'admin' && user.isAdmin) { this.props.fetchOrders()}
    else if (userId !== 'admin') { this.props.fetchOrders(userId) }
  }

  render() {
    const pastOrders = this.props.pastOrders
    const currentUser = this.props.user //user on state
    const userId = this.props.userId //accessed from URL, either userId or 'admin'
    //checking that user on state also matches user ID in URL bar (only users that are logged in can see their own order history)
    const authorized = currentUser && (currentUser.isAdmin || currentUser.id === userId)
    return (
      <div id="past-orders-component">
        { authorized &&
          (
            <div id="past-orders">
              <h2>Order History</h2>
              <ul>
                {pastOrders.map(order => {
                  return (
                    <li key={order.id}>
                      <Link to={`/users/${userId}/orders/${order.id}`}>
                        <ul>
                          <li><h4>Order No.{order.id}</h4></li>
                          <li>Ordered on {order.dateCreated}</li>
                          <li>Status: {order.status}</li>
                          <li>Total: ${order.total} </li>
                        </ul>
                      </Link>

                    </li>
                  )
                })}
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const user = ownProps.match.params.userId
  //if admin looking at all past orders will be admin rather than userId
  //route is /users/admin/orders rather than /users/:userId/orders
  const orders = user === 'admin' ?
    state.viewOrder.adminOrders :
    state.viewOrder.userOrders

  return {
    pastOrders: orders,
    userId: user,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const user = ownProps.match.params.userId

  if (user === 'admin') {
    return {
      fetchOrders() {
        dispatch(fetchAllOrders())
      }
    }
  } else {
    return {
      fetchOrders(userId) {
        dispatch(fetchUserOrders(userId))
      }
    }
  }
}

const PastOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(PastOrders)

export default PastOrdersContainer
