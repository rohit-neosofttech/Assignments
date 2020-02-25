import React, {Component} from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import axios from 'axios'
import * as api from '../../api'

const userToken = localStorage.getItem("userToken")

class Order extends Component {
    constructor(props) {
        super(props);
        this.state= {
            orders : []
        }
    }

    componentDidMount() {
        axios.get(`${api.baseurl}/getOrderDetails`,{
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then((res)=>{
            // console.log(res.data.product_details)
            this.setState({
                orders:res.data.product_details
            })

        })
        .catch((err)=> {
            alert("Invalid componentDidMount API call")      
        })
    }

    handleDate = (createdAt) => {
        var d = new Date(createdAt);
        var date = d.getDate();
        var month = d.getMonth() +1;
        var year = d.getFullYear();
        return (date+"/"+month+"/"+year)

    }

    downloadInvoice = (order) => {
        axios.post(`${api.baseurl}/getInvoiceOfOrder`,order,{
            headers:{
                Authorization: 'Bearer ' + userToken
            }
        })
        .then((res)=>{
            console.log(res)
            const url = `${api.baseurl}/${res.data.receipt}`
            window.open(url, '_blank');
            alert(`${res.data.message}`) 
        })
        .catch((err)=> {
            alert("invoice generation failed")      
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
                        <div>
                        { this.state.orders.length===0 
                            ? <div className="col-md-7">
                                <h1>No Order Found</h1>
                            </div> 
                            : this.state.orders.map(order =>
                            <div className="card p-3 m-3">
                                {console.log(order)}
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
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Order

