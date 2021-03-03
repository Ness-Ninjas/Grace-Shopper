import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemToCart} from '../store/cartItems'

class SingleProduct extends Component {
  componentDidMount() {}

  render() {
    const {isLoggedIn, singleProduct, addToCart} = this.props

    return (
      <div>
        <div id="left-box">
          <h2>Product.Title</h2>
          <img
            src="https://forestprod.org/global_graphics/default-store-350x350.jpg"
            alt="Item photo"
          />
        </div>
        <div id="right-box">
          <h2>Product.Price</h2>
          <div>
            <h3>Product.Description</h3>
          </div>
          <button type="button" onClick={() => addToCart(singleProduct)}>
            Add to cart
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {
    addToCart: product => dispatch(addItemToCart(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
