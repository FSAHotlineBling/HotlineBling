// Story: As a logged-in user, I want to view my list of previous orders, so that I can find an individual order I made in the past and review it.

// Implementation:
// BACKEND:
// Express route on the backend (GET) should serve up orders with matching user ID from database.
// Special access control needed - can only obtain information if user is logged in.
// Logged in user info stored on session

// FRONTEND:
// Create react component called (PastOrders?).
// List of all orders (sort by date).
// Each order should be a link to single order details.

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserOrders } from '../store'


/* Rather than loading all orders ever onto state, make axios request to /api/orders/:userId (URL route will be /users/:userId/orders) and fetch relevant orders from database.

(side note: will we need some sort of security in place to make sure that just anybody can't go to /api/orders/userId & see all past orders? how to implement that?)


This axios request will return a json-formatted list of user's past orders, pastOrders = [{}, {}, ...], accessed as prop from dispatch.

On store will need currentUserOrders to store list of orders for user, and currentOrder (?) to store single order being viewed (to be completed on another issue - note to self DO NOT TOUCH ANYTHING BESIDES 'currentUserOrders') */

export class PastOrders extends Component {
  // constructor() {
  //   super()
  // }

  componentDidMount() {

    // const userId = req.session.user.id
    this.props.fetchUserOrders(userId)
  }

  render() {
    const { pastOrders } = this.props
    return (
      <div id="past-orders">
        <h2>Your Order History</h2>
        <ul>
          {pastOrders.map(order => {
            return (
              <li key={order.id}>
                <h4>Order {order.id}</h4>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    user: state.users.find(user => user.id === paramId)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserOrders(userId) {
      dispatch(fetchUserOrders(userId))
    }
  }
}

const PastOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(PastOrders)

export default PastOrdersContainer
