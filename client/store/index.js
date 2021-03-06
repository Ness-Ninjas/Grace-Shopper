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

const reducer = combineReducers({
  user,
  allProducts,
  singleProduct,
  cartItems,
  allUsers,
  singleUser
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  saveState({
    cartItems: store.getState().cartItems
  })
})

export default store
export * from './user'
