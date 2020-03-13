import { ADD_CART_COUNT } from './cartType'
import { REMOVE_CART_COUNT } from './cartType'
import { REMOVE_CART } from './cartType'
import { SHOW_PROFILE } from './cartType'
import { ADD_PROFILE } from './cartType'
import { REMOVE_PROFILE } from './cartType'

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

export const addProfile = () => {
    return {
        type:ADD_PROFILE
    }
}

export const removeProfile = () => {
    return {
        type:REMOVE_PROFILE
    }
}

export const showProfile = () => {
    return {
        type:SHOW_PROFILE
    }
}