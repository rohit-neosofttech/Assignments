import React, { Component } from 'react'
import axios from 'axios'
import * as api from '../api'

const userToken = localStorage.getItem("userToken")

class Logout extends Component {
    componentDidMount() {
        let cart=''
        if(localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem("cart"))
            cart=[...cart,{'flag': "logout"}]
        }

        // let cart = JSON.parse(localStorage.getItem("cart"))
        //     cart=[...cart,{'flag': "logout"}]
        //     console.log(cart)
                
            axios.post(`${api.baseurl}/addProductToCartCheckout`,
                cart
            , {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=>{
                localStorage.removeItem('cart')
                localStorage.removeItem('tempCart')
                this.props.history.push('/')

            })
            .catch((err) => {
                alert('Invalid Address API call')
            })
        localStorage.removeItem('CustDetail')
        localStorage.removeItem('userToken')
        
        const { history } = this.props;
        history.push(`/`);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
