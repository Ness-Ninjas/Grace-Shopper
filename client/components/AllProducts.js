import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/products'
import {addItemToCart} from '../store/cartItems'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }
  render() {
    const {isLoggedIn, allProducts, addToCart, isAdmin} = this.props
    if (!allProducts.length) {
      return <h2> Loading products... </h2>
    }
    return (
      <div className="all-products-container">
        {allProducts.map(product => (
          <div key={product.id} className="all-products-product">
            <Link to={`/products/${product.id}`}>
              <img className="all-prod-image" src={product.imageUrlOne} />
              <h3>{product.name}</h3>
            </Link>
            <div>
              <p>{product.description}</p>
              <p>{product.price / 100}</p>
              <button
                type="button"
                classNametype="all-prod-button"
                onClick={() => addToCart(product, 1)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.allProducts,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    addToCart: (product, qty) => dispatch(addItemToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
