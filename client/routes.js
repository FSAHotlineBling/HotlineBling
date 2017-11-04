import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import PastOrders from './components/past-orders'
import OrderDetail from './components/past-order-detail'
import { Main, Login, Signup, UserHome, Phones, SingleProduct, Cart, AllUsers, NewReview, Checkout } from './components'
import { me, fetchProducts, store, fetchCreatedOrder, fetchUsers } from './store'



/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData(this.props.userId)
  }
  componentWillReceiveProps(nextProps) {
    this.props.loadInitialData(nextProps.userId)
  }

  render() {
    const { isLoggedIn } = this.props
    return (
      <Router history={history}>
        <Main>
          <div>
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route exact path="/" component={Phones} />
              <Route path="/phones/:phoneid" component={SingleProduct} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/cart" component={Cart} />
              <Route path="/users" component={AllUsers} />
              <Route path="/checkout" component={Checkout} />
              {
                isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route exact path="/users/:userId/orders" component={PastOrders} />
                  <Route exact path="/users/:userId/orders/:orderId" component={OrderDetail} />
                  <Route exact path="/products/:productId/review-product" component={NewReview} />
                </Switch>
              }
              {/* Displays our Login component as a fallback */}
              <Route component={Login} />
            </Switch>
          </div>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  let userId = null;
  if (Object.keys(state.user).length !== 0) {
    userId = state.user.id
  }
  return {
    isLoggedIn: !!state.user.id,
    userId: userId
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userId) {
      dispatch(fetchProducts())
      dispatch(me())
      dispatch(fetchUsers())
      if (userId) dispatch(fetchCreatedOrder(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
