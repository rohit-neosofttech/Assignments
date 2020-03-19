import React, { Component } from 'react'
import {removeCart} from '../redux'
import {connect} from 'react-redux'
import axios from 'axios'
import * as api from '../../api'

import { userLogout } from '../redux'
import { bindActionCreators } from "redux";

class Logout extends Component {
    
    componentDidMount() {
        if(localStorage.getItem('cart')) {
            // console.log("IF")
            let cart=''
            cart = JSON.parse(localStorage.getItem("cart"))
            cart=[...cart,{'flag': "logout"}]
     
            let userToken = localStorage.getItem("userToken")
            axios.post(`${api.baseurl}/addProductToCartCheckout`,
                cart
            , {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
        }
        else {
            let cart=[]
            cart=[{'flag': "logout"}]
            let userToken = localStorage.getItem("userToken")
            axios.post(`${api.baseurl}/addProductToCartCheckout`,
                cart
            , {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
        }

        localStorage.removeItem('cart')
        localStorage.removeItem('tempCart')
        localStorage.removeItem('CustDetail')
        localStorage.removeItem('EncrytDetail')
        localStorage.removeItem('userToken')
        this.props.userLogout()
        this.props.removeCart()
        const { history } = this.props;
        history.push(`/`);
        // this.props.removeCart()
        // window.location.reload(false)
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        userLogout,
        removeCart
    },dispatch)
  }
  
  export default connect(null, mapDispatchToProps)(Logout)
