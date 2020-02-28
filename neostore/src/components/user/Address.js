import React, { PureComponent } from 'react'
import UserHome from './UserHome'
import Header from '../header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as api from '../../api'

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))
const userToken = localStorage.getItem("userToken")


class Address extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            address:[]
        }
    }
    
    deleteAddress = (id) => {
        // alert(`${id} message deleted`)
        axios.delete(`${api.baseurl}/deladdress/${id}`, {
            headers: {
                Authorization: 'Bearer ' + userToken
              }
        })
        .then((res)=> {
            console.log(res)
            alert("Address Deteted")
        })
        .catch((err)=> {
            console.log(err)
            alert("wrong delete Address API")
        })
    }

    componentDidMount() {
        axios.get(`${api.baseurl}/getCustAllAddress`)
        .then((res)=>{
            const addr = res.data.customer_address.filter(address => address.customer_id===custDetail.customer_id)
            this.setState({
                address:addr
            })
        })
        .catch((err) => {
            alert('Invalid Address API call')
        })
    }

    componentDidUpdate(prevState) {
        if(this.state.address!==prevState.address) {
            this.componentDidMount()
        }
    }

    render() {
        return (
            <>
            <Header/>
            <div className="container p-3">
                <h3>My Account</h3>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="col-md-8 card profile-cards" >
                        <h2>Address</h2>
                        <hr/><br/>
                        { this.state.address.length===0 
                        ? <div className="col-md-7">
                            <h1>No Address Found</h1>
                          </div> 
                        :  this.state.address.map(addr =>
                        <React.Fragment key={addr.address_id}>
                            <div className="card p-3" key={addr.address_id}>
                                <span>{addr.address}</span>
                                <span>{`${addr.city} - ${addr.pincode}`}</span>
                                <span>{`${addr.state}, ${addr.country}`}</span><br/>
                                <Link to={{pathname:`/editAddress/${addr.address_id}`,state:{addr}}}>
                                    <button className="btn btn-primary" style={{width:'100px'}} >Edit</button>
                                </Link>
                                <button className="btn-close" style={{width:'fit-content'}} onClick={()=>this.deleteAddress(addr.address_id)}>
                                    <i className="fas fa-times" style={{padding:'0px'}}></i>
                                </button>
                            </div>
                            <hr/>   
                        </React.Fragment>
                        )}
                        <Link to='/addAddress'><button className="btn-edit" style={{width:'150px'}}>Add Address</button></Link>
                    </div>
                </div><br/><br/>
            </div>
            </>
        )
    }
}

export default Address

