import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addItemToCart} from '../store/cartItems'
import {fetchSingleProduct} from '../store/singleProduct'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      quantity: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()

    this.props.addToCart(this.props.singleProduct, this.state.quantity)
  }

  componentDidMount() {
    console.log(this.props)
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {
    const options = []
    const inventoryMax = 10
    for (let i = 1; i <= inventoryMax; i++) {
      options.push(
        <option value={i} qty={i}>
          {i}
        </option>
      )
    }
    const {isLoggedIn, singleProduct} = this.props

    return (
      <div className="all-products-container">
        <div id="left-box">
          <h2>{singleProduct.name}</h2>
          <img
            className="single-prod-image"
            src={singleProduct.imageUrlOne}
            alt="Item photo"
          />
        </div>
        <div id="right-box">
          <h2>{singleProduct.price}</h2>
          <div>
            <h3>{singleProduct.description}</h3>

            <form id="add-to-cart-form" onSubmit={this.handleSubmit}>
              <label htmlFor="changeQty">Quantity</label>

              <select
                id="changeQty"
                value={this.state.quantity}
                name="qty-select"
                onChange={this.handleChange}
              >
                {options}
              </select>

              <button type="submit" className=".all-prod-button">
                Add to Cart
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: id => dispatch(fetchSingleProduct(id)),
    addToCart: (product, qty) => dispatch(addItemToCart(product, qty))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
