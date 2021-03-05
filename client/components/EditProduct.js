import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {updateProduct} from '../store/products'

class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      price: 0,
      quantity: 1,
      description: '',
      category: '',
      imageUrlOne: '',
      imageUrlTwo: '',
      imageUrlThree: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.productId)
    this.setState(this.props.product)
    this.setState({price: this.props.product.price / 100})
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.editProduct({...this.state})
  }
  render() {
    const {isLoggedIn} = this.props
    const {
      name,
      price,
      quantity,
      description,
      category,
      imageUrlOne,
      imageUrlTwo,
      imageUrlThree
    } = this.state

    return (
      <div id="edit-product">
        <h1>Edit Product</h1>
        <form id="edit-product-form" onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input onChange={this.handleChange} name="name" value={name} />
          <label htmlFor="description">Description:</label>
          <textarea
            onChange={this.handleChange}
            name="description"
            value={description}
          />
          <label htmlFor="category">Category:</label>
          <input
            onChange={this.handleChange}
            name="category"
            value={category}
          />
          <label htmlFor="price">Price:</label>
          <input onChange={this.handleChange} name="price" value={price} />
          <label htmlFor="quantity">Quantity:</label>
          <input
            onChange={this.handleChange}
            name="quantity"
            value={quantity}
          />
          <label htmlFor="imageUrlOne">Image URL One:</label>
          <input
            onChange={this.handleChange}
            name="imageUrlOne"
            value={imageUrlOne}
          />
          <label htmlFor="imageUrlTwo">Image URL Two:</label>
          <input
            onChange={this.handleChange}
            name="imageUrlTwo"
            value={imageUrlTwo}
          />
          <label htmlFor="imageUrlThree">Image URL Three:</label>
          <input
            onChange={this.handleChange}
            name="imageUrlThree"
            value={imageUrlThree}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = (dispatch, {history}) => {
  return {
    getProduct: productId => dispatch(fetchSingleProduct(productId)),
    editProduct: product => dispatch(updateProduct(product, history))
  }
}

export default connect(mapState, mapDispatch)(EditProduct)
