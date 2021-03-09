import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  Cart,
  AdminDashboard,
  AdminProducts,
  AdminUsers,
  EditProduct,
  EditUser
} from './components'
// import AllProducts from './components/AllProducts'
import {me} from './store'
import {fetchCart} from './store/activeCart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (this.props.user.id) {
      this.props.setCart()
    }
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:productId" component={SingleProduct} />
        {isAdmin && (
          <Route
            path="/products/:productId/edit"
            render={routeProps => <EditProduct {...routeProps} />}
          />
        )}
        {isAdmin && <Route exact path="/admin" component={AdminDashboard} />}
        {isAdmin && <Route path="/admin/products" component={AdminProducts} />}
        {isAdmin && <Route path="/admin/users" component={AdminUsers} />}
        {isLoggedIn && <Route path="/home" component={UserHome} />}
        {isAdmin && (
          <Route
            path="/users/:userId/edit"
            render={routeProps => <EditUser {...routeProps} />}
          />
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    activeCart: state.activeCart,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    setCart() {
      dispatch(fetchCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
