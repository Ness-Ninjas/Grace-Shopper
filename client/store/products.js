import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

export const fetchAllProducts = () => {
  return async dispatch => {
    try {
      const allProducts = (await axios.get('/api/products')).data
      dispatch(getAllProducts(allProducts))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialProductsState = []

export default (state = initialProductsState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.allProducts
    default:
      return state
  }
}
