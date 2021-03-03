import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllProducts} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchAllProducts()
  }

  render() {
    const {isLoggedIn, allProducts} = this.props
    console.log('All products', allProducts)
    if (!allProducts.length) {
      return <h2>Loading products...</h2>
    }
    return (
      <div>
        {allProducts.map(product => (
          <div key={product.id}>
            <img src={product.imageUrlOne} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <button type="button">Add</button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    allProducts: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllProducts: () => dispatch(fetchAllProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
