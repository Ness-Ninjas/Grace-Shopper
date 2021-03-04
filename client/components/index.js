/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './AllProducts'
export {default as SingleProduct} from './SingleProduct'
export {default as Cart} from './Cart'
export {default as AddProduct} from './AddProduct'
export {default as AdminDashboard} from './AdminDashboard'
export {default as AdminProducts} from './AdminProducts'
export {default as AdminUsers} from './AdminUsers'
export {default as EditProduct} from './EditProduct'
