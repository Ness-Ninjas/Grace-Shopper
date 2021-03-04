import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
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

export const createProduct = (product, history) => {
  return async dispatch => {
    try {
      const created = (await axios.post('/api/products', product)).data
      dispatch(addProduct(created))
      history.push('/products')
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
    case ADD_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
