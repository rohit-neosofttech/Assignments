import { combineReducers } from 'redux'
import cartReducer from './cart/cartReducer'
import loginReducer from './userLogin/loginReducer'

const rootReducer = combineReducers({
    cart:cartReducer,
    userLogin:loginReducer
})

export default rootReducer