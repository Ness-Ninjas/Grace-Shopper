import axios from 'axios'

const SET_CART = 'SET_CART'
// const COMBINE_CARTS = 'COMBINE_CARTS'
const CLEAR_CART = 'CLEAR_CART'

export const setCart = cart => ({
  type: SET_CART,
  cart
})

// const combineCarts = (cart) => ({
//   type: COMBINE_CARTS,
//   cart,
// })

export const clearCart = () => ({
  type: CLEAR_CART
})

export const fetchCart = () => {
  return async dispatch => {
    try {
      const cart = (await axios.get('/api/carts')).data
      dispatch(setCart(cart))
    } catch (err) {
      console.error(err)
    }
  }
}

// export const mergeCarts = (currentActiveCart) => {
//   return async (dispatch) => {
//     try {
//       const cart = (await axios.put('/api/carts', currentActiveCart)).data
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

// export const removeCart = () => {
//   return (dispatch) => {
//     try {
//       dispatch(clearCart())
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

const initialActiveCartState = {}

export default (state = initialActiveCartState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case CLEAR_CART:
      return initialActiveCartState
    default:
      return state
  }
}
