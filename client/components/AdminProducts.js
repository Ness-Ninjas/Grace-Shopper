import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts, deleteProduct} from '../store/products'
import {Link} from 'react-router-dom'
import AddProduct from './AddProduct'

class AdminProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAdding: false
    }
  }
  componentDidMount() {
    this.props.fetchAllProducts()
  }
  render() {
    const {isLoggedIn, allProducts, removeProduct} = this.props
    if (!allProducts.length) {
      return <h2>Loading products...</h2>
    }
    return (
      <div>
        <button
          type="button"
          className="all-prod-button"
          onClick={() => {
            this.setState({isAdding: true})
          }}
        >
          Add Product
        </button>
        {this.state.isAdding && <AddProduct />}
        {this.state.isAdding && (
          <button
            type="button"
            className="all-prod-button"
            onClick={() => this.setState({isAdding: false})}
          >
            Cancel
          </button>
        )}
        <div className="all-products-container">
          {allProducts.map(product => (
            <div key={product.id} className="all-admin-product-container">
              <Link to={`/products/${product.id}/edit`}>
                <img className="admin-prod-image" src={product.imageUrlOne} />
              </Link>
              <Link to={`/products/${product.id}/edit`}>
                <h3 className="admin-prod-title">{product.name}</h3>{' '}
              </Link>
              <p>{product.description}</p>
              <p>{product.price / 100}</p>
              <button
                className="delete-button-admin"
                type="button"
                onClick={() => removeProduct(product)}
              >
                Delete
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
    allProducts: state.allProducts,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts()),
    removeProduct: product => dispatch(deleteProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AdminProducts)
