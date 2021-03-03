import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Cart extends Component {
  componentDidMount() {}

  render() {
    const {isLoggedIn, cartItems} = this.props
    if (!cartItems.length) {
      return <h2>Cart is empty</h2>
    }
    return (
      <div className="cart-container">
        {cartItems.map(product => (
          <div key={product.id} className="cart-product">
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrlOne} />
              <h3>{product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
