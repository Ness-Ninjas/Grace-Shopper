import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import cartIcon from './cartIcon'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1> Grace Shopper </h1>
    <nav className="Navbar">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home"> Home </Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login"> Login </Link> <Link to="/signup"> Sign Up </Link>
        </div>
      )}
      {isAdmin && <Link to="/admin"> Admin Dashboard </Link>}
      <Link to="/products"> Products </Link> <input placeholder="seach bar" />
      <Link to="/cart"> Cart </Link> <Link to="/orders"> Orders </Link>
      {/*  <cartIcon /> */}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
