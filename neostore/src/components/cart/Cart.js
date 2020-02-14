import React, { Component } from 'react'
import axios from 'axios'

import * as api from '../../api'
import { Link } from 'react-router-dom';

const userToken = localStorage.getItem("userToken")
const cart = JSON.parse(localStorage.getItem("cart"))


export class Cart extends Component {
    constructor() {
        super();
        this.state={
            cartProduct:'',
            allProduct:'',
            NoProduct:false
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

        this.setState({cartProduct:cart})
        axios.get(`${api.baseurl}/getAllProducts`) 
        .then((res)=>{       
                this.setState({allProduct:res.data.product_details})  
                // console.log(res.data.product_details)
            })

        .catch((err)=> {
            alert("Wrong API call")
        })
    }

    render() {
        return (
            <div>
                {console.log(this.state.cartProduct)}
                {(this.state.cartProduct.length===0)
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
                                {this.state.cartProduct.map(products =>
                                    <>
                                    <tr>
                                    <td style={{padding: '5px'}}>
                                        {console.log(this.state.allProduct.filter(item => item.product_id===products.product_id))}
                                        <div className="row">
                                            {/* <img className="cart-img" src={`${api.baseurl}/${products.product_id.product_image}`} alt="" /> */}
                                            <small>
                                                {products.product_id}<br/>
                                                <small>
                                                    by: producer<br/>
                                                </small>
                                                Status : stock
                                                {/* Status: {products.product_id.product_stock!==0 
                                                    ? <span style={{color:"green"}}>In Stock</span> 
                                                    : <span style={{color:"red"}}>Out of Stock</span>}<br/> */}
                                            </small>
                                        </div>
                                    </td>
                                    <td>
                                        <button>+</button>
                                        <button>-</button>
                                    </td>
                                    <td>@mdo</td>
                                    </tr>
                                    </>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-4 p-4">
                        <div className="card">
                            awdawd
                        </div>
                    </div>
                </div>
            }
            </div>
        )
    }
}

export default Cart

