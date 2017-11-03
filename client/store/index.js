import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import review from './review'
import order from './order'
import viewOrder from './viewOrder'
import products from './Product'
import cart from './cart'
import users from './users'
import singleProduct from './singleProduct'
const reducer = combineReducers({user, review, products, order, cart, singleProduct, viewOrder, users})


const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './review'
export * from './viewOrder'
export * from './Product'
export * from './order'
export * from './cart'
export * from './singleProduct'
export * from './users'
