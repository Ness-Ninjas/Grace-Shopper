import axios from 'axios'

const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {
      const product = (await axios.get(`/api/products/${productId}`)).data
      dispatch(setSingleProduct(product))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialSingleProductState = {}

export default (state = initialSingleProductState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}
