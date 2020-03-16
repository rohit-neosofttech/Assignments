const initialState = {
    loggedIn:false
}

const loginReducer = (state=initialState, action) => {
    switch(action.type) {
        case "USER_LOGIN" : 
        return {
            loggedIn:true
        }
        case "USER_LOGOUT" : 
        return {
            loggedIn:false
        }
        default: 
            return state
    }
}

export default loginReducer