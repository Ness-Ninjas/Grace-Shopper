import axios from 'axios'
import {remove} from 'lodash'

// Action Types:
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QTY = 'CHANGE_QTY'
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'

//Action Creator:
const addToCart = (product, qty) => ({
  type: ADD_TO_CART,
  product,
  qty
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
export const changeQuantity = (prodId, qty = 1) => {
  console.log('cart in the Thunk')
  return async dispatch => {
    try {
      //   const {data} = await axios.put('/api/')
      const thisUser = await axios.get('/auth/me')
      console.log('-------CHANGEQTY THUNK--------')
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

export const addItemToCart = (product, qty) => {
  console.log('cart', product)
  //find the correct cartitem line, find the correct product(use filter), find the 1 piece of data that has the corresponding product and order.  ARE WE UPDATING or ADDING to the quantity.  Update replaces, add,
  //pass in product into pieces we need, like Product ID, and a default quantity and soforth
  //this may break.  Add to cart clicking twice MAY not reflect 2 items.
  return async dispatch => {
    try {
      //const {data} = await axios.post('/api/cartItems', product) //WE MAY NEED TO CHANGE TO A PUT IN ORDER TO ADD QUANTITIES
      console.log('-------------THUNK: addItemToCart---------------')
      console.log('DATA: ', data)
      console.log('------------------------------------------------')
      dispatch(addToCart(product, qty))
    } catch (error) {
      console.log(error)
    }
  }
}

// Initial State
const initialState = []

const addOrIncrement = (state, itemToAdd) => {
  const filterResult = state.filter(item => item.id === itemToAdd.id)
  if (!filterResult[0]) {
    console.log('new item to Add')
    return [...state, itemToAdd]
  } else {
    const foundIndex = state.indexOf(filterResult[0])
    state[foundIndex].quantity += itemToAdd.quantity
    console.log('new item to Add', state)
    return state
  }
}

export default (state = initialState, action) => {
  console.log('====================REDUCER======================')
  console.log('cart', state)
  console.log('-------------------------------------------------')

  switch (action.type) {
    case ADD_TO_CART:
      const {id, name, description, price, imageUrlOne} = action.product
      const itemToAdd = {id, name, description, price, imageUrlOne}
      itemToAdd.quantity = action.qty
      // checking to see if an item already exists, if so, we add quantities
      return addOrIncrement(state, itemToAdd)
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
