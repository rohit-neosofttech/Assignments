import React from 'react'
import Cart from './Cart'
import DeliveryAddress from './DeliveryAddress'

function MainCart() {
    return (
        <div>
            <h1>Cart Section</h1>
            <hr/>
            <Cart/>
            <DeliveryAddress/>
        </div>
    )
}

export default MainCart
