import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
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
            checkAddr:''
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
            alert('Invalid Address API call')
        })
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
        const cart = JSON.parse(localStorage.getItem("cart"))
        console.log(cart)
        // cart.map(item =>
            
            // axios.post(`${api.baseurl}/addProductToCartCheckout`, {
            //     headers: {
            //         Authorization: 'Bearer ' + userToken
            //     }
            // })
            // .then((res)=>{
            //     console.log(res)
            // })
            // .catch((err) => {
            //     alert('Invalid Address API call')
            // })
                
        // )
        
    }

    render() {
        return (
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
                         {/* <input type="radio" name="Address" value={addr} onChange={()=>this.handleChange(addr.address_id)}>Select</input> */}
                            <RadioGroup aria-label="Address" name="Address" value={this.state.value}>
                                <FormControlLabel value={addr.address_id} control={<Radio />} label="Select" onChange={()=>this.handleChange(addr)} 
                                  checked={this.state.checkAddr === addr.address_id}/>
                            </RadioGroup>
                            <Link to={{pathname:`/editAddress/${addr.address_id}`,state:{addr}}}>
                                <button className="btn btn-primary" style={{width:'100px'}} >Edit</button>
                            </Link>
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
        )
    }
}

export default DeliveryAddress

