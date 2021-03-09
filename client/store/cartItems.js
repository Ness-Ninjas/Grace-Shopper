import axios from 'axios'
import {remove} from 'lodash'
import {setCart} from './activeCart'

// Action Types:
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_QTY = 'CHANGE_QTY'
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM'
const MERGE_WITH_USER = 'MERGE_WITH_USER'
const CLEAR_ITEMS = 'CLEAR_ITEMS'
const CHECKOUT = 'CHECKOUT'

//Action Creator:
const checkOut = cartId => ({
  type: CHECKOUT,
  cartId
})

const addToCart = (product, qty) => ({
  type: ADD_TO_CART,
  product,
  qty
})

const changeQty = (productId, qty) => ({
  type: CHANGE_QTY,
  productId,
  qty
})

const removeItem = id => ({
  type: CART_REMOVE_ITEM,
  id
})

const mergeWithUser = cartItems => ({
  type: MERGE_WITH_USER,
  cartItems
})

export const clearItems = () => ({
  type: CLEAR_ITEMS
})

// Thunks
export const checkout = cartId => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/carts', {})
      console.log(data)
      //dispatch(clearCart)
      //dispatch(setCart)
    } catch (error) {
      console.log(error)
    }
  }
}

export const changeQuantity = (product, qty = 1) => {
  //console.log('cart in the Thunk')
  return async dispatch => {
    try {
      const newProduct = {
        quantity: qty,
        id: product.id
      }
      const {data} = await axios.put('/api/cartItems/edit', newProduct)
      const thisUser = await axios.get('/auth/me')
      //console.log('-------CHANGEQTY THUNK--------')
      //console.log('cart in the thunk 2')
      dispatch(changeQty(product.id, qty))
    } catch (error) {
      console.log(error)
    }
  }
}
export const fetchRemovedItem = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cartItems/${id}`)
      //console.log('cart cart item deleted')
      dispatch(removeItem(id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addItemToCart = (product, qty) => {
  //console.log('product', product)

  return async dispatch => {
    try {
      //Manually setting this now...
      console.log('-----------------addItemToCart------------------')
      //product.cartId = 1
      // we need to fix this....
      product.productId = product.id
      product.currPrice = product.price
      await axios.post('/api/cartItems', product)
      dispatch(addToCart(product, qty))
    } catch (error) {
      console.log(error)
    }
  }
}

export const combineWithUserCart = cartItems => {
  return async dispatch => {
    try {
      const cart = (await axios.get('/api/carts')).data
      // const updatedItems = (await axios.put('/api/cartItems', cartItems)).data
      dispatch(setCart(cart))
      // dispatch(mergeWithUser(updatedItems))
    } catch (err) {
      console.error(err)
    }
  }
}

// Initial State
const initialState = []

const addOrIncrement = (state, itemToAdd) => {
  const filterResult = state.filter(item => item.id === itemToAdd.id)
  if (!filterResult[0]) {
    //console.log('new item to Add')
    return [...state, itemToAdd]
  } else {
    const foundIndex = state.indexOf(filterResult[0])
    state[foundIndex].quantity =
      parseInt(state[foundIndex].quantity) + parseInt(itemToAdd.quantity)
    //console.log('new item to Add', state)
    return [...state]
  }
}

export default (state = initialState, action) => {
  //console.log('====================REDUCER======================')
  //console.log('state', state)
  //console.log('-------------------------------------------------')

  switch (action.type) {
    case ADD_TO_CART:
      const {id, name, price, description, imageUrlOne} = action.product
      const itemToAdd = {id, name, price, description, imageUrlOne}
      itemToAdd.quantity = action.qty
      // checking to see if an item already exists, if so, we add quantities
      return addOrIncrement(state, itemToAdd)
    case CHANGE_QTY:
      const itemToChange = state.filter(item => item.id === action.productId)
      //console.log('ITEM TO CHANGE', itemToChange)
      itemToChange[0].quantity = action.qty
      return [...state]
    case CART_REMOVE_ITEM:
      const itemToRemove = state.filter(item => item.id !== action.id)
      return itemToRemove
    case CLEAR_ITEMS:
      return initialState
    default:
      return [...state]
  }
}
