import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import review from './review'
import order from './order'
import products from './Product'
<<<<<<< HEAD

const reducer = combineReducers({user, review, products, order})
=======
import singleProduct from './singleProduct'
const reducer = combineReducers({user, review, products, singleProduct})
>>>>>>> master

const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './review'
export * from './order'
export * from './Product'
export * from './singleProduct'

