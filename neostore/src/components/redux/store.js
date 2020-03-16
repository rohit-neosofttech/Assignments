import { createStore } from 'redux'
// import cartReducer from './cart/cartReducer'
// import loginReducer from './userlogin/loginReducer'
import rootReducer from './rootReducer'

const store = createStore(rootReducer)
export default store
