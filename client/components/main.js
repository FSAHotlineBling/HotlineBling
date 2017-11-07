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
  const { children, handleClick, isLoggedIn, userId } = props

  return (
    <div>
      <nav className="navbar" >
            <div className="container">
                <div className="row">
                  <div className="navbar-collapse" id="navbarNav">
                    <span>HOTLINE | BLING <Link to="/cart">Cart</Link><Link to="/">Home</Link></span>  
                  </div>

                    {
                    isLoggedIn
                      ? <span>
                          <a href="#" onClick={handleClick}>Logout</a>
                          <Link to={`/users/${userId}/orders`}>Account</Link>
                        </span>
                      : <span>
                          <Link to="/login">Login</Link>
                          <Link to="/signup">Sign Up</Link>
                        </span>
                     
                  }
                </div>
            </div>
        </nav>
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
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
