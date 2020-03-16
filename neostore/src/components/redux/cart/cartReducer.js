var count=0
if(localStorage.getItem('cart')) {
    let cartProduct=JSON.parse(localStorage.getItem('cart')) 
    cartProduct.map(item => count++)
}

const initialState = {
    cartCount:count
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
        case "CART_COUNT" : 
        var count=0
        if(localStorage.getItem('cart')) {
            let cartProduct=JSON.parse(localStorage.getItem('cart')) 
            cartProduct.map(item => count++)
        }
        return {
            cartCount:count
            // cartCount:localStorage.getItem('cart')? localStorage.getItem('cart').length : 0
        }
        default: 
            return state
    }
}

export default cartReducer