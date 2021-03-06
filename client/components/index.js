/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as Phones} from './Phones'
export {default as SingleProduct} from './SingleProduct'
export {default as NewReview} from './new-review'
export {Login, Signup} from './auth-form'
export {default as Cart} from './cart'
export {default as AllUsers} from './AllUsers'
export {default as Checkout } from './checkout'
export {default as ThankYou} from './ThankYou'
