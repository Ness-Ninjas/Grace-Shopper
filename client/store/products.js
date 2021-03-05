import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

const getAllProducts = allProducts => ({
  type: GET_ALL_PRODUCTS,
  allProducts
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

const removeProduct = product => ({
  type: REMOVE_PRODUCT,
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

export const createProduct = product => {
  return async dispatch => {
    try {
      const created = (await axios.post('/api/products', product)).data
      dispatch(addProduct(created))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateProduct = (product, history) => {
  return async dispatch => {
    try {
      const updated = (await axios.put(`/api/products/${product.id}`, product))
        .data
      dispatch(editProduct(updated))
      history.push('/admin/products')
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteProduct = product => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${product.id}`)
      dispatch(removeProduct(product))
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
    case EDIT_PRODUCT:
      return state.map(product => {
        return product.id === action.product.id ? action.product : product
      })
    case REMOVE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
