import { USER_LOGIN } from './loginType'
import { USER_LOGOUT } from './loginType'

export const userLogin = () => {
    debugger
    return {
        type:USER_LOGIN
    }
}

export const userLogout = () => {
    return {
        type:USER_LOGOUT
    }
}