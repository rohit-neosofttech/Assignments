import React, { PureComponent } from 'react'
import UserHome from './UserHome'
import Header from '../header/Header'
import axios from 'axios'
import {Link} from 'react-router-dom'
import * as api from '../../api'
import CircularProgress from '@material-ui/core/CircularProgress'
import SnackAlert from '../modules/SnackAlert'
import sweetalert from 'sweetalert'

// const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

class Address extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            address:[],
            loader:false,
            open:false,
            type:'',
            message:''
        }
    }
    
    componentDidMount() {
        this.setState({loader:true})
        if(localStorage.getItem("userToken")) {
            let userToken = localStorage.getItem("userToken")
            axios.get(`${api.baseurl}/getCustAddress`,{
                headers:{
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=>{
                const addr = res.data.customer_address
                this.setState({
                    address:addr,
                    loader:false
                })
            })
            .catch((err) => {
                this.setState({loader:false})
                if (err.response) {
                    sweetalert(err.response.data.message?`${err.response.data.message}` : "Error has occured", {button:false});
                } else if (err.request) {
                    sweetalert('', `${err.request}`, "error");
                } else {
                    sweetalert('', `${err.message}`, "error");
                }
            })
        }
    }

    deleteAddress = (id) => {
        sweetalert("Are you sure you want to delete address?", {
            buttons: {
            cancel: 'Cancel',
            confirm: {
                text: "Confirm",
                value: "confirm",
              },
            },
        })
        .then((value) => {
            switch (value) {
        
            case "confirm":
                let userToken = localStorage.getItem("userToken")
                axios.delete(`${api.baseurl}/deladdress/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + userToken
                      }
                })
                .then((res)=> {
                    const addr = this.state.address.filter(address => address.address_id!==id)
                    this.setState({
                        address:addr,
                        open:true,
                        message:"Address Deleted",
                        type:'success'
                    })
                })
                .catch((err)=> {
                    this.setState({loader:false})
                    if (err.response) {
                        sweetalert('',err.response.data.message?`${err.response.data.message}` : "Error has occured", 'error',{button:false});
                    } else if (err.request) {
                        sweetalert('', `${err.request}`, "error");
                    } else {
                        sweetalert('', `${err.message}`, "error");
                    }
                })
                break;
            default:
                
            }
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false});
    };

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
                        {this.state.loader
                        ? 
                            <div className="center" >
                                <CircularProgress/>
                            </div>
                        :
                        <>
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
                        </>
                        }
                        <Link to='/addAddress'><button className="btn-edit" style={{width:'150px'}}>Add Address</button></Link>
                    </div>
                </div><br/><br/>
                {this.state.open && <SnackAlert open={this.state.open} message={this.state.message} type={this.state.type} handleClose={this.handleClose}/>}
            </div>
            </>
        )
    }
}

export default Address

