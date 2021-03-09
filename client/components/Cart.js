import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeQuantity, checkout, fetchRemovedItem} from '../store/cartItems'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  handleCheckout() {
    const cartId = this.props
    this.props.checkout(cartId)
  }

  render() {
    const elements = ['one', 'two', 'three']
    const priceArray = []

    const options = []
    const inventoryMax = 10
    for (let i = 1; i <= inventoryMax; i++) {
      options.push(
        <option key={i} value={i} qty={i}>
          {i}
        </option>
      )
    }
    const {isLoggedIn, cartItems, deleteItem} = this.props
    if (!cartItems.length) {
      return <h2> Cart is empty </h2>
    }
    return (
      <div className="all-cart-container">
        {cartItems.map(product => (
          <div key={product.id} className="all-cart-product-container">
            <Link to={`/products/${product.id}`}>
              <img className="cart-prod-image" src={product.imageUrlOne} />
            </Link>
            <Link to={`/products/${product.id}`}>
              <div className="admin-prod-title-box">
                <h3 className="admin-prod-title">{product.name}</h3>
              </div>
            </Link>
            <p>{product.description}</p>
            <p>{product.price / 100}</p>
            <div>
              <label htmlFor="changeQty"> Change Quantity </label>
              <select
                id="changeQty"
                onChange={event => {
                  this.props.changeQuantity(product, Number(event.target.value))
                }}
              >
                <option value="default">{product.quantity}</option>
                {options}
              </select>
            </div>

            <button
              className="delete-button-admin"
              type="button"
              onClick={() => {
                deleteItem(product.id)
              }}
            >
              Remove from Cart
            </button>
          </div>
        ))}
        <button type="button" onClick={() => this.handleCheckout()}>
          Check Out
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    cartItems: state.cartItems,
    activeCart: state.activeCart
  }
}

const mapDispatch = dispatch => {
  return {
    changeQuantity: (product, qty) => dispatch(changeQuantity(product, qty)),
    deleteItem: id => dispatch(fetchRemovedItem(id)),
    checkout: () => dispatch(checkout())
  }
}

export default connect(mapState, mapDispatch)(Cart)
