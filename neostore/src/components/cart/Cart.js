import React, { Component } from 'react'
import NoProduct from './NoProduct'

import axios from 'axios'
import * as api from '../../api'
import {removeToCartCount} from '../redux'
import {connect} from 'react-redux'
import { List , ListItem } from '@material-ui/core';
import sweetalert from 'sweetalert'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state={
            cartProduct:JSON.parse(localStorage.getItem("cart")),
            allProduct:[],
            NoProduct:false,
            subTotal:0,
            gst:5,
            orderTotal:0,
            disabledMaxButton:[],
            disabledMinButton:[]
        }
    }
    
    componentDidMount() {
        if(localStorage.getItem('cart')) {
            let minProd=[]
            this.state.cartProduct.filter(product => product.quantity===1).map(product => minProd.push(product.product_id))
            this.setState({disabledMinButton:minProd})

            let maxProd=[]
            this.state.cartProduct.filter(product => product.quantity===9).map(product => maxProd.push(product.product_id))
            this.setState({disabledMaxButton:maxProd})
        }
        this.addTotal()
        
    }

    /**
     * Increase the quantity of the product in the cart by 1.
     * If the quantity reaches to 9 it append the product_id to disabledMaxButton array which will help 
     * to disable the button.
     * It also recalculate the total as the quantity increases.
     * 
     * @param product
     */
    addQuantity = (product) => {
        let item = this.state.cartProduct.filter(item => item.product_id===product.product_id)
        if(item[0].quantity===9) {
            this.setState({disabledMaxButton:[...this.state.disabledMaxButton,item[0].product_id]})
            // sweetalert(`Quantity reached MAX value`,{button:false})
        } else {
            item[0].quantity++
            item[0].total = item[0].quantity * item[0].product_cost
            this.setState(
                ()=>{return {cartProduct:this.state.cartProduct}}
            )
            var btn = this.state.disabledMinButton.filter(bttn => bttn!==item[0].product_id)
            btn && this.setState({disabledMinButton:btn})
            localStorage.setItem("cart",JSON.stringify(this.state.cartProduct))
        }
        this.addTotal()
    }

    /**
     * decrease the quantity of the product in the cart by 1.
     * If the quantity reaches to 1 it append the product_id to disabledMinButton array which will help 
     * to disable the button.
     * It also recalculate the total as the quantity decreases.
     * 
     * @param product
     */
    removeQuantity = (product) => {
        let item = this.state.cartProduct.filter(item => item.product_id===product.product_id)
        if(item[0].quantity===1) {
            this.setState({disabledMinButton:[...this.state.disabledMinButton,item[0].product_id]})
            // sweetalert(`Quantity reached MIN value`,{button:false})
        } else {
            item[0].quantity--
            item[0].total = item[0].quantity * item[0].product_cost
            this.setState(
                ()=>{return {cartProduct:this.state.cartProduct}}
            )
            var btn = this.state.disabledMaxButton.filter(bttn => bttn!==item[0].product_id)
            btn ? this.setState({disabledMaxButton:btn}) : console.log(btn) 
            localStorage.setItem("cart",JSON.stringify(this.state.cartProduct))
        }
        this.addTotal()
    }

    /**
     * remove the product from the cart list with a confirmation alert.
     * It also recalculate the total as the product is removed.
     * 
     * @param product
     */
    removeItem = (product) => {
        sweetalert("Are you sure you want to delete this item from cart", {
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
                let item = this.state.cartProduct.filter(item => item.product_id!==product.product_id)
                if(item.length!==0) {
                    this.setState({cartProduct:item})
                    localStorage.setItem("cart",JSON.stringify(item))
                    if(localStorage.getItem('userToken')) {
                        let userToken = localStorage.getItem("userToken")
                        axios.delete(`${api.baseurl}/deleteCustomerCart/${product.product_id}`,{
                            headers: {
                            Authorization: 'Bearer ' + userToken
                            }
                        })
                    }
                    this.addTotal()
                } else {
                    if(localStorage.getItem('userToken')) {
                        let userToken = localStorage.getItem("userToken")
                        axios.delete(`${api.baseurl}/deleteCustomerCart/${product.product_id}`,{
                            headers: {
                            Authorization: 'Bearer ' + userToken
                            }
                        })
                    }
                    this.setState({cartProduct:item})
                    localStorage.removeItem('cart')
                    this.forceUpdate()
                }
                this.addTotal()
                this.props.removeToCartCount()
                break;
            default:     
                break;
            }
        });
    }

    /**
     * calculate the total of the product in the cart, its GST and order total cost.
     */
    addTotal = () => {
        if(this.state.cartProduct!==null && localStorage.getItem("cart")) {
            let cartProduct = JSON.parse(localStorage.getItem("cart"))
            let total = 0
            cartProduct.map(product => total += product.total)
            let gst = total*5/100
            let orderTotal = 0
            orderTotal = total+gst
            this.setState({
                subTotal:total,
                gst:gst,
                orderTotal:orderTotal
            })
        }
    }

    /**
     * Renders the component if the state of subTotal changes
     * 
     * @param   prevState   contains the previous state of the component (i.e before it is been updated)
     * @return              returns a boolen value if the state is need to be updated 
     */
    componentDidUpdate(prevState) {
        if(prevState.subTotal!==this.state.subTotal) {
            return true
        }
    }

    render() {
        return (
            <div>
                {(!localStorage.getItem("cart"))
                ?<NoProduct/>
                :<div className="row" style={{margin:"0px"}}>
                    <div className="col-md-8 p-4">
                        <div className="card"  style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        {}
                        <table className="table">
                            <thead>
                                <tr>
                                <th scope="col" style={{width:"50%"}}>Product</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Price</th>
                                <th scope="col">Total</th>
                                <th scope="col"></th>

                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cartProduct.map(product =>
                                <tr key={product.product_id}>
                                    <td style={{padding: '5px'}}>
                                        <div className="row">
                                            <img className="cart-img" src={`${api.baseurl}/${product.product_image}`} alt="" />
                                            <small>
                                                {product.product_name}<br/>
                                                <small>
                                                    by: {product.product_producer}<br/>
                                                </small>
                                                Status: {product.product_stock!==0 
                                                    ? <span style={{color:"green"}}>In Stock</span> 
                                                    : <span style={{color:"red"}}>Out of Stock</span>}<br/>
                                            </small>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="cart-quantity-btn" style={{}} onClick={()=>this.removeQuantity(product)} disabled={this.state.disabledMinButton.filter(bttn =>bttn===product.product_id).length!==0} >-</button>
                                        <span>&emsp;{product.quantity}&emsp;</span>
                                        <button className="cart-quantity-btn" onClick={()=>this.addQuantity(product)} disabled={this.state.disabledMaxButton.filter(bttn =>bttn===product.product_id).length!==0} >+</button>
                                    </td>
                                    <td>{product.product_cost}</td>
                                    <td>{product.total}</td>
                                    <td><button className="cart-trash-btn" onClick={()=>this.removeItem(product)}><i id="icon-red" className="fa fa-trash"></i></button></td>
                                </tr>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4 p-4">
                        <div className="card p-3">
                            <h3 className="center">Review Order</h3><br/>
                            <List>
                                <ListItem>
                                    <h5>Sub-Total</h5><h5 className="right">{this.state.subTotal}</h5>
                                </ListItem>
                                <ListItem>
                                    <h5>GST (5%)</h5><h5 className="right">{this.state.gst}</h5>
                                </ListItem>
                                <ListItem>
                                    <h5>Order Total</h5><h5 className="right">{this.state.orderTotal}</h5>
                                </ListItem>
                            </List><br/>
                            <button className="btn-order" onClick={()=>this.props.handleSelect('address')} >Proceed To Buy</button>
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeToCartCount: () => dispatch(removeToCartCount())
    }
  }
  
  export default connect(null, mapDispatchToProps)(Cart)

