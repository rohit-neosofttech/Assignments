import React from 'react'
import { Link } from 'react-router-dom'

function OrderPlaced() {
    return (
        <div className="div-default center">
            <br/><br/><br/>
            <p className="order-placed">Thank you for your order</p>
            <p>Your order has been placed and is being processed</p>
            <Link to="/"><button className="btn btn-primary">Return To Home Page</button></Link>
        </div>
    )
}

export default OrderPlaced
