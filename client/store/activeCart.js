import axios from 'axios'

const SET_CART = 'SET_CART'

const setCart = cart => ({
  type: SET_CART,
  cart
})

export const createCart = () => {
  return async dispatch => {
    try {
      const cart = (await axios.get('/api/carts')).data
      dispatch(setCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialActiveCartState = {}

export default (state = initialActiveCartState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
