import React, { Component } from 'react'
import axios from 'axios'
import * as api from '../../api'

export class Cart extends Component {
    componentDidMount() {
        axios.get(`${api.baseurl}/getCustCartData`) 
        .then((res)=>{     
            console.log(res)
        })
        .catch((err)=> {
            // alert("Wrong API call")
        })
    }

    render() {
        return (
            <div>
                <h1>Cart: Order process</h1>
            </div>
        )
    }
}

export default Cart

