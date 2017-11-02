

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserOrders } from '../store'


/* Rather than loading all orders ever onto state, make axios request to /api/orders/:userId (URL route will be /users/:userId/orders) and fetch relevant orders from database.

(side note: will we need some sort of security in place to make sure that just anybody can't go to /api/orders/userId & see all past orders? how to implement that?)

This axios request will return a json-formatted list of user's past orders, pastOrders = [{}, {}, ...], accessed as prop from dispatch.

On store will need currentUserOrders to store list of orders for user, and currentOrder (?) to store single order being viewed (to be completed on another issue - note to self DO NOT TOUCH ANYTHING BESIDES 'currentUserOrders') */

export class PastOrders extends Component {


  componentDidMount() {
    const userId = this.props.userId
    console.log('userID is', userId)
    this.props.fetchUserOrders(userId)
  }

  render() {
    const pastOrders = this.props.pastOrders
    const currentUser = this.props.user //user on state
    const userId = this.props.userId //accessed from URL
    //checking that user on state also matches user ID in URL bar (only users that are logged in can see their own order history)
    const authorized = currentUser && (currentUser.isAdmin || currentUser.id === userId)
    console.log('authorized is', authorized)
    return (
      <div id="past-orders-component">
        { authorized &&
          (
            <div id="past-orders">
              <h2>Your Order History</h2>
              <ul>
                {pastOrders.map(order => {
                  return (
                    <li key={order.id}>
                      <Link to={`/users/${userId}/orders/${order.id}`}>
                        <ul>
                          <li><h4>Order No.{order.id}</h4></li>
                          <li>Ordered on {order.dateCreated}></li>
                          <li>Status: {order.status}</li>
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
  return {
    pastOrders: state.viewOrder,
    userId: Number(ownProps.match.params.userId),
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUserOrders(userId) {
      dispatch(fetchUserOrders(userId))
    }
  }
}

const PastOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(PastOrders)

export default PastOrdersContainer
