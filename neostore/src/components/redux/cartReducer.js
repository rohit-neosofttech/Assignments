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
        }
        default: 
            return state
    }
}

export default cartReducer