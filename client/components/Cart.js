import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {changeQuantity, fetchRemovedItem} from '../store/cartItems'

class Cart extends Component {
  constructor() {
    super()

    this.changeQty = this.changeQty.bind(this)
  }
  componentDidMount() {}

  changeQty(event, productId) {
    this.props.changeQuantity(productId, Number(event.target.value))
  }

  render() {
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
                <option value="1" qty="1">
                  1
                </option>
                <option value="2" qty="2">
                  2
                </option>
                <option value="3" qty="3">
                  3
                </option>
                <option value="4" qty="4">
                  4
                </option>
                <option value="5" qty="5">
                  5
                </option>
                <option value="6" qty="6">
                  6
                </option>
                <option value="7" qty="7">
                  7
                </option>
                <option value="8" qty="8">
                  8
                </option>
                <option value="9" qty="9">
                  9
                </option>
                <option value="10" qty="10">
                  10
                </option>
                <option value="default" selected>
                  {product.quantity}
                </option>
              </select>
            </div>
            <button type="button"
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
