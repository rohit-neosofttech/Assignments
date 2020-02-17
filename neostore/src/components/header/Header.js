import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import User from '../../defaultUser.png'
import axios from 'axios'
import * as api from '../../api'

import Search from './Search'
import './Header.css'

const userToken = localStorage.getItem("userToken")

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            cartproducts:[],
            text:'',
            profile_image:null,
            count:0
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            text:e.target.value
        })
    }
    
    componentDidMount() {
    //     axios.get(`${api.baseurl}/getCartData`,{
    //         headers:{
    //             Authorization: 'bearer ' + userToken
    //         }}) 
    //     .then((res)=>{                 
    //         let oldCart = JSON.parse(localStorage.getItem('cart')) 
    //         let newItem
    //         let tempCart=[]
    //         if (oldCart===null) {
    //             oldCart=[]
    //         }
        
    //         if (res.data.product_details.length!==0){
    //             res.data.product_details.map( product =>
    //             <>{newItem = {
    //                 productId:product.product_id.product_id,
    //                 productName:product.product_id.product_name,
    //                 ProductImage:product.product_id.product_image,
    //                 productCost:product.product_id.product_cost,
    //                 productProducer:product.product_id.product_producer,
    //                 productStock:product.product_id.product_stock,
    //                 quantity:product.quantity
    //             }}
    //             {tempCart.push(newItem)}
    //             </>
    //         )}
    //         var cart = [...new Set([...oldCart, ...tempCart])];
    //         localStorage.setItem('tempCart',JSON.stringify(tempCart))
    //         localStorage.setItem('cart',JSON.stringify(cart))

    //         this.setState({cartProduct:cart})
    //         })

    //     .catch((err)=> {
    //         // alert("Wrong API call")
    //         this.setState({NoProduct:!this.state.NoProduct})
    //     })
            let count=0
            if(localStorage.getItem('cart')) {
                let cartProduct=JSON.parse(localStorage.getItem('cart')) 
                cartProduct.map(item => count++)
                this.setState({count:count})
            }
            console.log(count)
    }

    componentDidUpdate(prevState) {
        if(this.state.count!==prevState.count) {
            this.render()
        }
    }
    
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg">
                    <Link to='/'>
                        <span className="logo">Neo<strong>STORE</strong></span>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item active">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/productspage">Product</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/order">Order</NavLink>
                            </li>
                        </ul>
                        
                        <ul className="nav navbar-nav ml-auto">
                            <Search></Search>
                            {/* <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" onChange={this.onChangeHandler} value={this.state.text} placeholder="Search"/>
                            </form> */}
                            <Link to="/maincart">
                                <button className="btn-cart">
                                    <Badge className="badge" anchorOrigin={{vertical: 'top',horizontal: 'right',}} 
                                    badgeContent={this.state.count}>
                                        <i className="fa fa-shopping-cart"></i>
                                    </Badge>Cart
                                </button>
                            </Link>
                            <div className="dropdown">
                                <button className="btn-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="user-avatar" src={(this.state.profile_image===null)?User:`${api.baseurl}/${this.state.profile_image}`} alt='' />
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {localStorage.getItem('userToken')
                                        ? <>
                                            <Link className="dropdown-item" to='/profile'>Profile</Link>
                                            <Link className="dropdown-item" to='/logout'>Log out</Link>
                                          </>
                                        : <>
                                            <Link className="dropdown-item" to='/login'>Login</Link>
                                            <Link className="dropdown-item" to='/register'>Register</Link>
                                          </>
                                    }
                                </div>
                            </div>
                            </ul>
                    </div>
                </nav>
            </div>
          )  
    }
}

export default Header
