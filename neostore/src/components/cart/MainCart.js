import React, { useState }  from 'react'
import Cart from './Cart'
import DeliveryAddress from './DeliveryAddress'
import Header from '../header/Header'
import sweetalert from 'sweetalert'

import { Tabs, Tab } from 'react-bootstrap';

function MainCart(props) {
    const [key, setKey] = useState('cart');

    /**
     * check if that is user is logged-in.
     * if not the page will be redirected to the login page
     */
    const handleLogin = () => {
        if(!localStorage.getItem("userToken")) {
            sweetalert('',"Please Login First","warning",{button:false,timer:2000})
            props.history.push(`/login`);
            localStorage.removeItem('custDetail')
        }
    }

    /**
     * check if that is user is logged-in.
     * if not the page will be redirected to the login page
     * 
     * @param   key   the key value of the tabs
     */
    const handleSelect = (key) => {
        if(!localStorage.getItem("userToken")) {
            sweetalert('',"Please Login First","warning",{button:false,timer:2000})
            props.history.push(`/login`);
            localStorage.removeItem('custDetail')
        }
        else {
            setKey(key)
        }
      }

    return (
        <>
        <Header/>
        <div style={{minHeight:"600px"}}>
            <hr/>
            <Tabs className="nav nav-tabs justify-content-between" id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)}>
                <Tab className="nav-link" eventKey="cart" title={<><i style={{color:"black"}} className="fas fa-cart-plus"></i>Cart</>} >
                    <Cart handleSelect={handleSelect}/>
                </Tab>
                <Tab className="nav-link" eventKey="address" title={<span onClick={()=>handleLogin()} ><i style={{color:"black"}} className="fas fa-address-book"></i>Delivery Address</span>} >
                    <DeliveryAddress props={props}/>
                </Tab>
            </Tabs>
        </div>
        </>
    )
}

export default MainCart
