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
    //console.log('PROPS', this.props)
    const {isLoggedIn, allProducts, addToCart, isAdmin, state} = this.props

    //console.log('============AllProducts=================')
    //console.log('this.props: ', this.props)

    if (!allProducts.length) {
      return <h2> Loading products... </h2>
    }
    return (
      <div className="all-products-container">
        {allProducts.map(product => (
          <div key={product.id} className="all-products-product">
            <div className="all-products-inner" />
            <Link to={`/products/${product.id}`}>
              <img className="all-prod-image" src={product.imageUrlOne} />
            </Link>
            <Link to={`/products/${product.id}`}>
              <h3 className="admin-prod-title">{product.name}</h3>
            </Link>
            <p>{product.price / 100}</p>
            <p>{product.description}</p>
            <div className="button-div">
              <button
                type="button"
                className="all-prod-button"
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
    isAdmin: state.user.admin,
    state: state,
    cartId: state.activeCart.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    addToCart: (product, qty) => dispatch(addItemToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
