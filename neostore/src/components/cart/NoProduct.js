import React from 'react'
import { Link } from 'react-router-dom'

function NoProduct() {
    return (
        <div className="center">
            <img src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png" alt="" />
            <h1>YOUR CART IS CURRENTLY EMPTY</h1>
            <p>Before proceed to checkout you must add some products to you shopping cart.</p>
            <p>You will find lots of intresting products on our products page</p>
            <Link to="/productsPage"><button className="btn btn-primary">Return To Product Page</button></Link>
            <br/><br/>
        </div>
    )
}

export default NoProduct
