import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'

import { Main, Login, Signup, UserHome, Phones, SingleProduct } from './components'
import { me, fetchProducts, store, fetchCreatedOrder } from './store'

import NewReview from './components/new-review'
import Navbar from './Navbar'

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
            <NewReview />
            <Navbar />
            <Switch>
              {/* Routes placed here are available to all visitors */}
              <Route exact path="/" component={Phones} />
              <Route path="/phones/:phoneid" component={SingleProduct} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              {
                isLoggedIn &&
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
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
