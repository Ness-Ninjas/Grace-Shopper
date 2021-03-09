import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeQuantity, fetchRemovedItem} from '../store/cartItems'

class Cart extends Component {
  constructor() {
    super()

    this.changeQty = this.changeQty.bind(this)
  }

  changeQty(event, productId) {
    this.props.changeQuantity(productId, Number(event.target.value))
  }

  render() {
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
              <img src={product.imageUrlOne} /> <h3> {product.name}</h3>
            </Link>
            <p>{product.description}</p>
            <p>{product.price / 100}</p>
            <div>
              <p> {product.quantity} </p>
              <label htmlFor="changeQty"> Change Quantity </label>
              <select
                id="changeQty"
                onChange={event => {
                  this.changeQty(event, product.id)
                }}
              >
                <option value="default">{product.quantity}</option>
                {options}
              </select>
            </div>
            <button
              type="button"
              onClick={() => {
                deleteItem(product.id)
              }}
            >
              {' '}
              Remove from Cart{' '}
            </button>
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
  return {
    changeQuantity: (id, qty) => dispatch(changeQuantity(id, qty)),
    deleteItem: id => dispatch(fetchRemovedItem(id))
  }
}

export default connect(mapState, mapDispatch)(Cart)
