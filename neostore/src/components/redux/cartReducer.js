var count=0
if(localStorage.getItem('cart')) {
    let cartProduct=JSON.parse(localStorage.getItem('cart')) 
    cartProduct.map(item => count++)
}

const initialState = {
    cartCount:count,
    profile:''
}

const cartReducer = (state=initialState,action) => {
    switch(action.type) {
        case "ADD_CART_COUNT" : 
        return {
            cartCount:state.cartCount+1
            // cartCount:localStorage.getItem('cart')? localStorage.getItem('cart').length : 0
        }
        case "REMOVE_CART_COUNT" : 
        return {
            cartCount:state.cartCount-1
            // cartCount:localStorage.getItem('cart')? localStorage.getItem('cart').length : 0
        }
        case "REMOVE_CART" : 
        return {
            cartCount:0
            // cartCount:localStorage.getItem('cart')? localStorage.getItem('cart').length : 0
        }
        case "SHOW_PROFILE" : 
        return {
            profile:state.profile
        }
        case "ADD_PROFILE" : 
        return {
            profile:localStorage.getItem('custDetail') ? localStorage.getItem('custDetail').profile_img : ''
        }
        case "REMOVE_PROFILE" : 
        return {
            profile:''
        }
        default: 
            return state
    }
}

export default cartReducer