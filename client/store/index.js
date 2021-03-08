import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {loadState, saveState} from './localStorage'
import allProducts from './products'
import cartItems from './cartItems'
import singleProduct from './singleProduct'
import allUsers from './users'
import singleUser from './singleUser'
import activeCart, {createCart} from './activeCart'

const reducer = combineReducers({
  user,
  allProducts,
  singleProduct,
  cartItems,
  activeCart,
  allUsers,
  singleUser
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

console.log('store', store)
console.log('state', store.getState())
if (!store.getState().activeCart.id) {
  store.dispatch(createCart())
}

store.subscribe(() => {
  saveState({
    cartItems: store.getState().cartItems
  })
})

export default store
export * from './user'
