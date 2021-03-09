import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const AdminDashboard = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome Admin! What would you like to review?</h3>
      <div className="admin-container">
        <div className="inner-pad">
          <Link to="/admin/products">Products</Link>
        </div>
        <div className="inner-pad">
          <Link to="/admin/users">Users</Link>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(AdminDashboard)
