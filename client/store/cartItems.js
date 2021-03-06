import axios from 'axios'
import {remove} from 'lodash'

// Action Types:
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QTY = 'CHANGE_QTY'
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'

//Action Creator:
const addToCart = product => ({
  type: ADD_TO_CART,
  product
})

const changeQty = (prodId, qty) => ({
  type: CHANGE_QTY,
  prodId,
  qty
})

const removeItem = id => ({
  type: CART_REMOVE_ITEM,
  id
})
// Thunks
export const changeQuantity = (prodId, qty) => {
  console.log('cart in the Thunk')
  return dispatch => {
    try {
      //   const {data} = await axios.put('/api/')
      console.log('cart in the thunk 2')
      dispatch(changeQty(prodId, qty))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchRemovedItem = id => {
  console.log('cart item deleted')
  return dispatch => {
    try {
      //   const {data} = await axios.put('/api/')
      console.log('cart cart item deleted')
      dispatch(removeItem(id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addItemToCart = (product, userId) => {
  console.log('cart', product)
  //find the correct cartitem line, find the correct product(use filter), find the 1 piece of data that has the corresponding product and order.  ARE WE UPDATING or ADDING to the quantity.  Update replaces, add,
  //pass in product into pieces we need, like Product ID, and a default quantity and soforth
  //this may break.  Add to cart clicking twice MAY not reflect 2 items.
  return dispatch => {
    try {
      //   const {data} = await axios.post('/api/') //WE MAY NEED TO CHANGE TO A PUT IN ORDER TO ADD QUANTITIES
      dispatch(addToCart(product))
    } catch (error) {
      console.log(error)
    }
  }
}

// Initial State
const initialState = []

export default (state = initialState, action) => {
  console.log('hello from the reducer')
  console.log(state)

  switch (action.type) {
    case ADD_TO_CART:
      const {id, name, description, price, imageUrlOne} = action.product
      const itemToAdd = {id, name, description, price, imageUrlOne}
      itemToAdd.quantity = qty
      let result = [...state, itemToAdd]
      console.log(result)
      return result
    case CHANGE_QTY:
      console.log(state)
      const itemToChange = state.filter(item => item.id === action.prodId)
      itemToChange[0].quantity = action.qty
      return state
    case CART_REMOVE_ITEM:
      const itemToRemove = state.filter(item => item.id !== action.id)
      return itemToRemove
    default:
      return state
  }
}
