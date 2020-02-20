import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import NoProduct from './NoProduct'
import * as api from '../../api'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const custDetail = JSON.parse(localStorage.getItem("CustDetail"))
const userToken = localStorage.getItem("userToken")


class DeliveryAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:[],
            value:null,
            checkAddr:'',
            empty:false
        }
    }
    
    componentDidMount() {
        axios.get(`${api.baseurl}/getCustAddress`, {
            headers: {
                Authorization: 'Bearer ' + userToken
              }
        })
        .then((res)=>{
            const addr = res.data.customer_address
            console.log(addr)
            this.setState({address:addr})
        })
        .catch((err) => {
            // alert('Invalid Address API call')
        })

        if(localStorage.getItem("cart")) { 
            this.setState({empty:false}) 
        }else { this.setState({empty:true})}
    }

    handleChange = (addr) => {
        console.log(addr)
        this.setState({checkAddr:addr.address_id})
        axios.put(`${api.baseurl}/updateAddress`,{
            address_id:addr.address_id,
            isDeliveryAddress:true
        }, {
            headers: {
                Authorization: 'Bearer ' + userToken
              }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err) => {
            alert('Invalid Address API call')
        })
    };

    placeOrder =() => {
        if(this.state.checkAddr==='') {
            alert("Please Select a Delivery Address")
        }
        else {
            let cart = JSON.parse(localStorage.getItem("cart"))
            cart=[...cart,{'flag': "checkout"}]
            console.log(cart)
                
            axios.post(`${api.baseurl}/addProductToCartCheckout`,
                cart
            , {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=>{
                this.props.history.push('/orderPlaced')
                localStorage.removeItem('cart')
                localStorage.removeItem('tempCart')
            })
            .catch((err) => {
                alert('Invalid Address API call')
            })
        }    
    }
    

    render() {
        return (
            <div>
                {(this.state.empty)
                ? <NoProduct/>
                :
                <div className="container card">
                    <h2>Address</h2>
                        <hr/><br/>
                    <div className="row" >
                        { this.state.address.length===0 
                        ? <div className="col-md-7">
                            <h1>No Address Found</h1>
                        </div> 
                        :  this.state.address.map(addr =>
                        <>
                            <div className="col-md-4 card p-3 m-3" key={addr.address_id}>
                                <span>{addr.address}</span>
                                <span>{`${addr.city} - ${addr.pincode}`}</span>
                                <span>{`${addr.state}, ${addr.country}`}</span><br/>
                                <div className="row">
                                    <div className="col">
                                    <RadioGroup aria-label="Address" name="Address" value={this.state.value}>
                                        <FormControlLabel value={addr.address_id} control={<Radio />} label="Select" onChange={()=>this.handleChange(addr)} 
                                        checked={this.state.checkAddr === addr.address_id}/>
                                    </RadioGroup>
                                    </div>
                                    <div className="col">
                                    <Link to={{pathname:`/editAddress/${addr.address_id}`,state:{addr}}}>
                                        <button className="btn btn-primary" style={{width:'100px'}} >Edit</button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                            <hr/>   
                        </>
                        )}
                    </div>
                    <div style={{display:"inline-block"}}>
                        <Link to='/addAddress'><button className="btn-edit" style={{width:'150px'}}>Add Address</button></Link>
                        <button className="btn-edit" style={{width:'150px'}} onClick={()=>this.placeOrder()}>Place Order</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default DeliveryAddress

