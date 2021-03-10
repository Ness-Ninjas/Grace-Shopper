import axios from 'axios'
import {remove} from 'lodash'
import {setCart, clearCart, fetchCart} from './activeCart'

// Action Types:
const SET_CART_ITEMS = 'SET_CART_ITEMS'
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
const setCartItems = items => ({
  type: SET_CART_ITEMS,
  items
})

const addToCart = item => ({
  type: ADD_TO_CART,
  item
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

export const checkout = (cartId, totalPrice) => {
  return async dispatch => {
    console.log(cartId, totalPrice)
    try {
      const cart = (await axios.get(`/api/carts/`)).data
      if (cart.id) {
        await axios.put('/api/carts', {totalPrice: totalPrice})
        console.log(cart)
        await axios.put('/api/carts', {status: 'closed'})
        //const cart = (await axios.put('/api/carts', {status: "closed"})).data

        //const {data} = await axios.get(`/api/cartItems/${cartId}`)
        //const items = data
        //console.log(cart)

        dispatch(clearCart())
        dispatch(fetchCart())
        alert(`Checkout Successful! Total Price: ${totalPrice / 100}`)
      } else {
        dispatch(clearItems())
        alert(`Guest Checkout Successful! Total Price: ${totalPrice / 100}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export const fetchCartItems = cart => {
  return async dispatch => {
    try {
      const items = (await axios.get(`/api/cartItems/${cart.id}`)).data
      dispatch(setCartItems(items))
    } catch (err) {
      console.error(err)
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
  return async dispatch => {
    try {
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        imageUrlOne: product.imageUrlOne,
        imageUrlTwo: product.imageUrlTwo,
        imageUrlThree: product.imageUrlThree,
        quantity: qty
      }
      const {data} = await axios.post('/api/cartItems', item) //WE MAY NEED TO CHANGE TO A PUT IN ORDER TO ADD QUANTITIES
      dispatch(addToCart(item))
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
      dispatch(fetchCartItems(cart))
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
      Number(state[foundIndex].quantity) + Number(itemToAdd.quantity)
    console.log('new item to Add', state)
    return [...state]
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CART_ITEMS:
      return action.items
    case ADD_TO_CART:
      return addOrIncrement(state, action.item)
    case CHANGE_QTY: {
      const itemToChange = state.filter(item => item.id === action.productId)
      itemToChange[0].quantity = action.qty
      return [...state]
    }
    case CART_REMOVE_ITEM: {
      const itemToRemove = state.filter(item => item.id !== action.id)
      return itemToRemove
    }
    case CLEAR_ITEMS:
      return initialState
    default:
      return [...state]
  }
}
