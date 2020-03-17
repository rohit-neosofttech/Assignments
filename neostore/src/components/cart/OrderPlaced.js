import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'

// const [status, setStatus] = useState('cart');

function OrderPlaced(props) {
    return (
        <>
        {props.location.state ?
        <>
            <Header/>
            <div className="div-default center">
                <br/><br/><br/>
                <p className="order-placed">Thank you for your order</p>
                <p>Your order has been placed and is being processed</p>
                <Link to="/"><button className="btn btn-primary">Return To Home Page</button></Link>
            </div>
        </>
        : <>{props.history.goBack()}</>
        }
        </>
    )
}

export default OrderPlaced
