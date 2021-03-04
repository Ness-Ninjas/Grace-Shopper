import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllUsers} from '../store/user'
import {Link} from 'react-router-dom'

class AdminUsers extends Component {
  componentDidMount() {
    this.props.fetchAllUsers()
  }
  render() {
    const {isLoggedIn, allUsers, isAdmin} = this.props
    if (!allUsers.length) {
      return <h2>Loading users...</h2>
    }
    return (
      <div>
        {isAdmin && <Link to="/users/add">Add Product</Link>}
        <div className="all-products-container">
          {allProducts.map(product => (
            <div key={product.id} className="all-products-product">
              <Link to={`/products/${product.id}`}>
                <img src={product.imageUrlOne} />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.description}</p>
              <p>{product.price / 100}</p>
              <button type="button" onClick={() => addToCart(product)}>
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allUsers: state.allUsers,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}

export default connect(mapState, mapDispatch)(AdminUsers)
