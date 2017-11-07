import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchUserOrders, fetchAllOrders } from '../store'



/*
STILL NEED TO DO THIS
(side note: will we need some sort of security in place to make sure that just anybody can't go to /api/orders/userId & see all past orders? how to implement that?)
 */

export class PastOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: undefined
    }
    this.filterOrders = this.filterOrders.bind(this)
  }


  componentDidMount() {
    const userId = this.props.userId //userId param in URL
    const user = this.props.user

    // if URL route is /users/admin/orders & user is actaully admin
    if (userId === 'admin' && user.isAdmin) { this.props.fetchOrders() }
    else if (userId !== 'admin') { this.props.fetchOrders(userId) }
  }

  filterOrders(event) {
    const filter = event.target.value.toLowerCase()
    const pastOrders = this.props.pastOrders
    let orders = filter !== 'default' ?
      pastOrders.filter(order => order.status === filter) :
      pastOrders
    this.setState({ orders })
  }

  render() {
    const pastOrders = this.state.orders ? this.state.orders : this.props.pastOrders
    const currentUser = this.props.user //user on state
    const userId = this.props.userId //accessed from URL, either userId or 'admin'
    //checking that user on state also matches user ID in URL bar (only users that are logged in can see their own order history)
    const authorized = currentUser && (currentUser.isAdmin || currentUser.id === userId)
    return (
      <div id="past-orders-component">
        {authorized &&
          (
          <div className="container">
            <div className="row">
              <div className="col-sm-2" />
              <div className="col-sm-8">
                <div id="past-orders">
                  <h2>Order History</h2>
                    { currentUser.isAdmin &&
                      (
                        <select name="filter-orders" onChange={this.filterOrders} >
                            <option value="default">Filter Orders By Status</option>
                            <option>Created</option>
                            <option>Processing</option>
                            <option>Cancelled</option>
                            <option>Completed</option>
                            <option>Delivered</option>
                        </select>
                      )
                    }
                    <ul>
                      {pastOrders.map(order => {
                        return (
                          <div className="card" key={order.id}>
                            <div className="card-header">
                              <Link to={`/users/${userId}/orders/${order.id}`}>Order No.{order.id}</Link>
                            </div>
                            <div className="card-block">
                              <blockquote className="card-blockquote">
                                <p>Ordered on {order.dateCreated}</p>
                                <footer>Status: {order.status} Total: ${order.total} </footer>
                              </blockquote>
                            </div>
                        </div>
                        )
                      })}
                    </ul>
                </div>
                </div>
                <div className="col-sm-2" />
                </div>
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
