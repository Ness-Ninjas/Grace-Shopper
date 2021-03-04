import React, {Component} from 'react'
import {connect} from 'react-redux'

class EditProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.product.name,
      price: this.props.product.price,
      quantity: this.props.product.quantity,
      description: this.props.product.description,
      category: this.props.product.category,
      imageUrlOne: this.props.product.imageUrlOne,
      imageUrlTwo: this.props.product.imageUrlTwo,
      imageUrlThree: this.props.product.imageUrlThree
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {}
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
  return {}
}

export default connect(mapState, mapDispatch)(EditProduct)
