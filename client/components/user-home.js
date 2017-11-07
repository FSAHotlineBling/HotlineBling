import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div clasName="container">
      <div className="row">
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <div class="card text-center">
              <div class="card-header">
                Welcome
              </div>
              <div class="card-block">
                <h4 class="card-title">Hi, {email}</h4>
                <p class="card-text"> Check out our new specials</p>
              </div>
              <div class="card-footer text-muted">
                Happy Shopping!
              </div>
            </div>
        </div>
        <div className="col-sm-2" />
      </div>
    </div>

  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
