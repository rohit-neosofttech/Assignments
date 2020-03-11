import { ADD_CART_COUNT } from './cartType'
import { REMOVE_CART_COUNT } from './cartType'
import { REMOVE_CART } from './cartType'

export const addToCartCount = () => {
    return {
        type:ADD_CART_COUNT
    }
}

export const removeToCartCount = () => {
    return {
        type:REMOVE_CART_COUNT
    }
}

export const removeCart = () => {
    return {
        type:REMOVE_CART
    }
}