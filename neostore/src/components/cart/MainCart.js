import React, { useState }  from 'react'
import Cart from './Cart'
import DeliveryAddress from './DeliveryAddress'
import Header from '../header/Header'

import { Tabs, Tab } from 'react-bootstrap';

import { Link } from 'react-router-dom'

function MainCart(props) {
    const [key, setKey] = useState('cart');
    const handleLogin = () => {
        if(!localStorage.getItem("userToken")) {
            alert("Please Login First")
            const { history } = props;
            history.push(`/login`);
        }
    }

    const handleSelect = (key) => {
        // alert('selected ' + key);
        if(!localStorage.getItem("userToken")) {
            alert("Please Login First")
            const { history } = props;
            history.push(`/login`);
        }
        else {
            setKey(key)
        }
      }

    return (
        <>
        <Header/>
        <div>
            {/* <h1>Cart Section</h1> */}
            <hr/>

            <Tabs className="nav nav-tabs justify-content-between" id="controlled-tab-example" activeKey={key} onSelect={k => setKey(k)} onClick={()=>handleLogin()}>
                <Tab className="nav-link" eventKey="cart" title={<><i style={{color:"black"}} className="fas fa-cart-plus"></i>Cart</>}>
                    <Cart handleSelect={handleSelect}/>
                </Tab>
                <Tab className="nav-link" eventKey="address" title={<><i style={{color:"black"}} className="fas fa-address-book"></i>Delivery Address</>}>
                    <DeliveryAddress props={props}/>
                </Tab>
            </Tabs>

            {/* <ul id="tabs" className="nav nav-tabs justify-content-between">
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
                        <DeliveryAddress props={props} />
                    </div>
                </div> */}
        </div>
        </>
    )
}

export default MainCart
