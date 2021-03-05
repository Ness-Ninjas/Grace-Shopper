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
      <h3>Welcome Admin!</h3>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/users">Users</Link>
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
