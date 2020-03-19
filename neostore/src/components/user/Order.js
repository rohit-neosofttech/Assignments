import React, {Component} from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as api from '../../api'
import sweetalert from 'sweetalert'

class Order extends Component {
    constructor(props) {
        super(props);
        this.state= {
            orders : [],
            loader:false
        }
    }

    componentDidMount() {
        if(localStorage.getItem('userToken')) {
            this.setState({loader:true})
            let userToken = localStorage.getItem("userToken")
            axios.get(`${api.baseurl}/getOrderDetails`,{
                headers:{
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=>{
                this.setState({
                    orders:res.data.product_details,
                    loader:false
                })

            })
            .catch((err)=> {
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'Something Went Wrong getting your Order', "error",{button:false})
                } else if (err.request) {
                    sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                    sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            })
        }
    }

    /**
     * Handle Date Format
     * 
     * @param   createdAt   date format retrived from the json
     * @returns             returns a string of desired date format
     */
    handleDate = (createdAt) => {
        var d = new Date(createdAt);
        var date = d.getDate();
        var month = d.getMonth() +1;
        var year = d.getFullYear();
        return (date+"/"+month+"/"+year)

    }

    /**
     * API call that will download the order invoice pdf when the button is clicked
     * 
     * @param   order   contain the order_id of the order which trigger the event
     * @returns         
     */
    downloadInvoice = (order) => {
        let userToken = localStorage.getItem("userToken")
        axios.post(`${api.baseurl}/getInvoiceOfOrder`,order,{
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then((res)=>{
            const url = `${api.baseurl}/${res.data.receipt}`
            window.open(url, '_blank');
            sweetalert(`${res.data.message}`) 
        })
        .catch((err)=> {
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Invoice Generation Failed', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            } 
        })
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
                    <div className="col-md-8 p-3">
                        {this.state.loader
                        ? 
                            <div className="center" >
                                <CircularProgress/>
                            </div>
                        :
                        <div>
                        
                        { this.state.orders.length===0 
                            ? <div className="col-md-7">
                                <h1>No Order Found</h1>
                            </div> 
                            : this.state.orders.map(order =>
                            <div className="card p-3 m-3" key={order._id}>
                                <span><strong style={{color:"#cb7b13"}}>TRANSIT&emsp;</strong> 
                                    Order By: {order._id}
                                </span>
                                <span><small>Placed on :&nbsp;{this.handleDate(order.product_details[0].createdAt)}&nbsp;/&nbsp;&nbsp;
                                    <span style={{color:"#198029"}}>&#8377;{order.product_details[0].total_cartCost}</span></small>
                                </span><hr/>
                                <div className="div-order">
                                {
                                    order.product_details.map(product=>
                                        <img  key={product._id} className="order-img" src={`${api.baseurl}/${product.product_details[0].product_image}`} alt="product"/>
                                )}
                                </div>  
                                <hr/>
                                <button className="btn-invoice" onClick={()=>this.downloadInvoice(order)}>Download invoice as PDF</button>
                            </div> 
                        )}
                        </div>
                        }
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Order

