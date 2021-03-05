import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  componentDidMount() {}

  render() {
    const {isLoggedIn, singleProduct} = this.props

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
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {}
}

const mapDispatch = dispatch => {
  return {}
}

export default SingleProduct
