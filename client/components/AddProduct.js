import React from 'react'
import {connect} from 'react-redux'
import {createProduct} from '../store/products'

const initialState = {
  name: '',
  price: 0,
  quantity: 1,
  description: '',
  category: '',
  imageUrlOne: '',
  imageUrlTwo: '',
  imageUrlThree: ''
}

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.addProduct({...this.state})
    this.setState(initialState)
  }
  render() {
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
      <div id="add-product">
        <h3>Add New Product</h3>
        <form id="add-product-form" onSubmit={this.handleSubmit}>
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

const mapDispatch = dispatch => {
  return {
    addProduct: product => dispatch(createProduct(product))
  }
}

export default connect(null, mapDispatch)(AddProduct)
