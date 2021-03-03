import axios from 'axios'

// Action Types:
const ADD_TO_CART = 'ADD_TO_CART'

//Action Creator:
const addToCart = product => ({
  type: ADD_TO_CART,
  product
})
// Thunks
export const addItemToCart = (product, userId) => {
  console.log('cart', product)
  return dispatch => {
    try {
      //   const {data} = await axios.post('/api/')
      console.log('cart 2', product)
      dispatch(addToCart(product))
    } catch (error) {
      console.log(error)
    }
  }
}

// Initial State
const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
