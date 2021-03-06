import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout, resetOrder } from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn, userId, isAdmin } = props

  return (
    <div>
      <nav className="navbar" >
        <div className="container">
          <div className="row">
            <div className="navbar-collapse" id="navbarNav">
              <span>HOTLINE | BLING
                      <Link to="/cart">Cart</Link>
                <Link to="/">Home</Link></span>
            </div>

            <div id="admin-navbar">
              {
                (
                  isAdmin &&
                  <span>
                    <li><Link to="/users">View Users</Link></li>
                    <li><Link to="/users/admin/orders">View All Orders</Link></li>
                  </span>
                )
              }
            </div>

            <div id="user-navbar">
            {
              isLoggedIn
                ? <span>
                  <li><a href="#" onClick={handleClick}>Logout</a></li>
                  <li><Link to={`/users/${userId}/orders`}>Account</Link></li>
                </span>
                : <span>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </span>
            }
            </div>
          </div>
        </div>
      </nav>
      <div id="children">
        {children}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(resetOrder())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
