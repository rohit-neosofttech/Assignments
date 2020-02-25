import React from 'react'
import Cart from './Cart'
import DeliveryAddress from './DeliveryAddress'
import Header from '../header/Header'

import { Link } from 'react-router-dom'

function MainCart(props) {
    const handleLogin = () => {
        if(!localStorage.getItem("userToken")) {
            alert("Please Login First")
            const { history } = props;
            history.push(`/login`);
        }
    }

    return (
        <>
        <Header/>
        <div>
            <h1>Cart Section</h1>
            <hr/>
            <ul id="tabs" className="nav nav-tabs justify-content-between">
                <li className="nav-item">
                    <Link href="" data-target="#cart" data-toggle="tab" className="nav-link active"><i style={{color:"black"}} className="fas fa-cart-plus"></i>Cart</Link>
                </li>
                <li className="nav-item" >
                    <Link href="" data-target="#address" data-toggle="tab" className="nav-link" onClick={()=>handleLogin()}>Delivery Address</Link>
                </li>
            </ul>
            <br/>
                <div id="tabsContent" className="tab-content">
                    <div id="cart" className="tab-pane fade active show">
                        <Cart/>
                    </div>
                    <div id="address" className="tab-pane fade">
                        <DeliveryAddress/>
                    </div>
                </div>
        </div>
        </>
    )
}

export default MainCart
