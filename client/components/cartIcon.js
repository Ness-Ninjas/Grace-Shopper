import React from 'react'
import {connect} from 'react-redux'

const cartIcon = props => {
  console.log('==============cartIcon=========================')
  console.log(props)
  return (
    <div className="icon-cart" style="float: left">
      <div className="cart-line-1" style="background-color: #02A7D7">
        {' '}
      </div>{' '}
      <div className="cart-line-2" style="background-color: #02A7D7">
        {' '}
      </div>{' '}
      <div className="cart-line-3" style="background-color: #02A7D7">
        {' '}
      </div>{' '}
      <div className="cart-wheel" style="background-color: #02A7D7">
        {' '}
      </div>{' '}
    </div>
  )
}

const mapState = state => {
  return {
    cartItems: state.activeCart
  }
}

export default connect(mapState)(cartIcon)
