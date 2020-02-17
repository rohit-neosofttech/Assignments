import React, { Component } from 'react'
import axios from 'axios'

import * as api from '../../api'
import { Link } from 'react-router-dom';
import { List , ListItem } from '@material-ui/core';

const userToken = localStorage.getItem("userToken")
const cart = JSON.parse(localStorage.getItem("cart"))


class Cart extends Component {
    constructor() {
        super();
        this.state={
            cartProduct:JSON.parse(localStorage.getItem("cart")),
            allProduct:[],
            NoProduct:false,
            subTotal:0,
            gst:5,
            orderTotal:0
        }
    }
    
    componentDidMount() {
        // axios.get(`${api.baseurl}/getCartData`,{
        //     headers:{
        //         Authorization: 'bearer ' + userToken
        //     }}) 
        // .then((res)=>{                 
        //     let oldCart = JSON.parse(localStorage.getItem('cart')) 
        //     let newItem
        //     let tempCart=[]
        //     if (oldCart===null) {
        //         oldCart=[]
        //     }
        
        //     if (res.data.product_details.length!==0){
        //         res.data.product_details.map( product =>
        //         <>{newItem = {
        //             productId:product.product_id.product_id,
        //             productCost:product.product_id.product_cost,
        //             quantity:product.quantity
        //         }}
        //         {tempCart.push(newItem)}
        //         </>
        //     )}
        //     var cart = [...new Set([...oldCart, ...tempCart])];
        //     localStorage.setItem('tempCart',JSON.stringify(tempCart))
        //     localStorage.setItem('cart',JSON.stringify(cart))

        //     this.setState({cartProduct:cart})
        //     })

        // .catch((err)=> {
        //     // alert("Wrong API call")
        //     this.setState({NoProduct:!this.state.NoProduct})
        // })

        // axios.get(`${api.baseurl}/getAllProducts`) 
        // .then((res)=>{       
        //         this.setState({allProduct:res.data.product_details})  
        //         console.log(res)
        //     })

        // .catch((err)=> {
        //     alert("Wrong is API call")
        // })
        // this.setState({cartProduct:JSON.parse(localStorage.getItem("cart"))})
        this.addTotal()
    }

    addQuantity = (product) => {
        let item = this.state.cartProduct.filter(item => item.productId===product.productId)
        if(item[0].quantity===8) {
            alert(`Quantity reached MAX value`)
        } else {
            item[0].quantity++
            this.setState(
                ()=>{return {cartProduct:this.state.cartProduct}}
            )
        // this.setState({cartProduct:quan})
        localStorage.setItem("cart",JSON.stringify(this.state.cartProduct))
        }
        this.addTotal()
    }

    removeQuantity = (product) => {
        let item = this.state.cartProduct.filter(item => item.productId===product.productId)
        if(item[0].quantity===1) {
            alert(`Quantity reached MIN value`)
        } else {
            item[0].quantity--
            this.setState(
                ()=>{return {cartProduct:this.state.cartProduct}}
            )
        // this.setState({cartProduct:quan})
        localStorage.setItem("cart",JSON.stringify(this.state.cartProduct))
        }
        this.addTotal()
    }

    removeItem = (product) => {
        if (window.confirm("Are you sure you want to delete this item from cart")) {
            let item = this.state.cartProduct.filter(item => item.productId!==product.productId)
            if(item.length!==0) {
                this.setState(
                    {cartProduct:item}
                )
                localStorage.setItem("cart",JSON.stringify(this.state.cartProduct))
            } else {
                this.setState(
                    {cartProduct:item}
                )
                localStorage.removeItem('cart')
            }
            this.addTotal()
        }
    }

    addTotal = () => {
        if(this.state.cartProduct!==null) {
            let total=0
            this.state.cartProduct.map(product => total += product.quantity * product.productCost)
            let gst = total*5/100
            let orderTotal = 0
            orderTotal = total+gst
            this.setState({
                subTotal:total,
                gst:gst,
                orderTotal:orderTotal
            })
        }
        else {

        }
    }

    componentDidUpdate(prevState) {
        if(prevState.subTotal!==this.state.subTotal) {

        }
    }

    render() {
        return (
            <div>
                {/* {console.log(this.state.cartProduct)} */}
                {(!localStorage.getItem("cart"))
                ?<div className="center">
                    <img src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png" alt="" />
                    <h1>YOUR CART IS CURRENTLY EMPTY</h1>
                    <p>Before proceed to checkout you must add some products to you shopping cart.</p>
                    <p>You will find lots of intresting products on our products page</p>
                    <Link to="/productsPage"><button className="btn btn-primary">Return To Product Page</button></Link>
                </div>
                :<div className="row" style={{margin:"0px"}}>
                    <div className="col-md-8 p-4">
                        <div className="card"  style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        {}
                        <table class="table">
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
                                    <>
                                    <tr>
                                    <td style={{padding: '5px'}}>
                                        {/* {cartItem=this.state.allProduct.filter(item => item.product_id===products.product_id)} */}
                                        {/* {console.log(cartItem)} */}
                                        <div className="row">
                                            <img className="cart-img" src={`${api.baseurl}/${product.ProductImage}`} alt="" />
                                            <small>
                                                {product.productName}<br/>
                                                <small>
                                                    by: {product.productProducer}<br/>
                                                </small>
                                                Status: {product.productStock!==0 
                                                    ? <span style={{color:"green"}}>In Stock</span> 
                                                    : <span style={{color:"red"}}>Out of Stock</span>}<br/>
                                            </small>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="cart-quantity-btn" onClick={()=>this.addQuantity(product)} >+</button>
                                        <span>&emsp;{product.quantity}&emsp;</span>
                                        <button className="cart-quantity-btn" onClick={()=>this.removeQuantity(product)} >-</button>
                                    </td>
                                    <td>{product.productCost}</td>
                                    <td>{product.productCost*product.quantity}</td>
                                    <td><button className="cart-trash-btn" onClick={()=>this.removeItem(product)}><i id="icon-red" className="fa fa-trash"></i></button></td>
                                    </tr>
                                    </>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4 p-4">
                        <div className="card p-3">
                            <h3 className="center">Review Order</h3>
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
                            </List>
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

export default Cart

