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
    console.log('==============CART.JS  handleCheckout============')
    const cartId = this.props
    console.log(cartId)
    console.log('--------------------------------------')
    this.props.checkout(cartId)
  }
  render() {
    //console.log('=============CART.JS==================')
    //console.log(this.props.cartitems)
    //console.log('--------------------------------------')

    const elements = ['one', 'two', 'three']

    const options = []
    const inventoryMax = 10
    for (let i = 1; i <= inventoryMax; i++) {
      options.push(
        <option value={i} qty={i}>
          {i}
        </option>
      )
    }
    const {isLoggedIn, cartItems, deleteItem} = this.props
    if (!cartItems.length) {
      return <h2> Cart is empty </h2>
    }
    return (
      <div className="cart-container">
        {cartItems.map(product => (
          <div key={product.id} className="cart-product">
            <Link to={`/products/${product.id}`}>
              <h4> {product.name}</h4>
              <img src={product.imageUrlOne} className="single-cart-image" />
            </Link>
            <p>
              <span>{product.description}</span>
              <span>{product.price / 100}</span>
              <span> {product.quantity} </span>
            </p>
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
            <button
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
