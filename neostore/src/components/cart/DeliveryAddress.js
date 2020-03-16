import React, { PureComponent } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import NoProduct from './NoProduct'
import * as api from '../../api'
import CircularProgress from '@material-ui/core/CircularProgress'
import {connect} from 'react-redux'
import {removeCart} from '../redux'

import SnackAlert from '../SnackAlert'
import sweetalert from 'sweetalert'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Loading from 'react-fullscreen-loading';


const userToken = localStorage.getItem("userToken")

class DeliveryAddress extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            address:[],
            value:null,
            checkAddr:'',
            empty:false,
            loader:false,
            open:false,
            message:'',
            type:'',
            tab:false
        }
    }
    
    componentDidMount() {
        if(localStorage.getItem('userToken')){
            this.setState({loader:true})
            axios.get(`${api.baseurl}/getCustAddress`, {
                headers: {
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
                // if (err.response) {
                //     sweetalert("Error", err.response.data.message?`${err.response.data.message}` : "Error has occured", "error", {button:false});
                // } else if (err.request) {
                //     sweetalert("Error", `${err.request}`, "error");
                // } else {
                //     sweetalert("Error", `${err.message}`, "error");
                // }
            })
        }

        if(localStorage.getItem("cart")) { 
            this.setState({empty:false}) 
        }else { this.setState({empty:true})}
    }

    handleChange = (addr) => {
        this.setState({
            checkAddr:addr.address_id, 
            loader:true
        })
        axios.put(`${api.baseurl}/updateAddress`,{
            address_id:addr.address_id,
            isDeliveryAddress:true
        }, {
            headers: {
                Authorization: 'Bearer ' + userToken
              }
        })
        .then((res)=>{
            this.setState({
                type:'info',
                message:"Address updated",
                loader:false,
                open:true
            })

        })
        .catch((err) => {
            this.setState({loader:false})
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong while updating the address', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
        })
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open:false
        })
    };

    placeOrder = () => {
        const  {history} = this.props.props
        if(this.state.checkAddr==='') {
            sweetalert("Please Select a Delivery Address",'','warning',{button:false,timer:2000})
        }
        else {

            let cart = JSON.parse(localStorage.getItem("cart"))
            cart=[...cart,{'flag': "checkout"}]
            
            this.setState({tab:true}) 
            axios.post(`${api.baseurl}/addProductToCartCheckout`,
                cart
            , {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=>{
                this.setState({tab:false}) 
                localStorage.removeItem('cart')
                localStorage.removeItem('tempCart')
                this.props.removeCart()
                history.push('/orderPlaced')
            })
            .catch((err) => {
                this.setState({tab:false}) 
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'Something Went Wrong while Placing the Order', "error",{button:false})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            })
        }    
    }
    
    render() {
        return (
            <>
            {this.state.tab
            ?
            <div style={{minHeight:'600px'}}>
                <Loading loading loaderColor="#3498db" />
                <div className="div-default center">
                    <br/><br/><br/>
                    <p className="order-placed">Your Order is in Process</p>
                    <p>Please Wait while we confirm your order</p>
                    <Link to="/mainCart"><button className="btn btn-primary">Return To Cart</button></Link>
                </div>
            </div>
            :
            <div>
                {(this.state.empty || !localStorage.getItem("cart"))
                ? <NoProduct/>
                :
                <div className="container card p-4">
                    <h2>Address</h2>
                        <hr/><br/>
                    {this.state.loader
                    ? 
                        <div className="center" >
                            <CircularProgress/>
                        </div>
                    :
                    <>
                        <div className="row" >
                            { this.state.address.length===0 
                            ? <div className="col-md-7">
                                <h1>No Address Found</h1>
                            </div> 
                            :  this.state.address.map(addr =>
                            <React.Fragment key={addr.address_id}>
                                <div className="col card p-3 m-3" key={addr.address_id}>
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
                            </React.Fragment>
                            )}
                        </div>
                        <div style={{display:"inline-block"}}>
                            <Link to='/addAddress'><button className="btn-edit" style={{width:'150px'}}>Add Address</button></Link>
                            <button className="btn-edit" style={{marginLeft:'50px',width:'150px'}} onClick={this.placeOrder}>Place Order</button>
                        </div>
                    </>
                    }
                </div>
                }
                {this.state.open && <SnackAlert open={this.state.open} message={this.state.message} 
                    type={this.state.type} handleClose={this.handleClose}/>}
            </div>
            }
            </>
        )
    }
}

// export default DeliveryAddress


const mapDispatchToProps = dispatch => {
    return {
        removeCart : () => dispatch(removeCart())
    }
}

export default connect(null,mapDispatchToProps)(DeliveryAddress)

