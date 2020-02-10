import React, { Component } from 'react'
import UserHome from './UserHome'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as api from '../../api'

class Address extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:[]
        }
    }
    
    componentDidMount() {
        axios.get(`${api.baseurl}/getCustAllAddress`)
        .then((res)=>{
            const addr = res.data.customer_address.filter(address => address.customer_id===43)
            this.setState({
                address:addr
            })
            console.log(this.state.address)

        })
        .catch((err) => {
            alert('Invalid Address API call')
        })
    }

    render() {
        return (
            <div className="container">
                <h1>My Account</h1>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="col-md-7 card profile-cards" >
                        <h2>Address</h2>
                        <hr/><br/>
                        { this.state.address.length===0 
                        ? <div className="col-md-7">
                            <h1>No Address Found</h1>
                          </div> 
                        :  this.state.address.map(addr =>
                        <>
                            <div className="card p-3" key={addr.address_id}>
                                {console.log(addr.address)}
                                <span>{addr.address}</span>
                                <span>{`${addr.city} - ${addr.pincode}`}</span>
                                <span>{`${addr.state}, ${addr.country}`}</span><br/>
                                <button className="btn btn-primary" style={{width:'100px'}}>Edit</button>
                                <button className="btn-close" style={{width:'fit-content'}}>
                                    <i class="fas fa-times" style={{padding:'0px'}}></i>
                                </button>
                            </div>
                            <hr/>   
                        </>
                        )}
                        <Link to='/addAddress'><button className="btn-edit" style={{width:'150px'}}>Add Address</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Address

