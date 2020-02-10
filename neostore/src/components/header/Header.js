import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import axios from 'axios'
import * as api from '../../api'

import Search from './Search'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            text:''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            text:e.target.value
        })

        // console.log(`http://180.149.241.208:3022/getProductBySearchText/${this.state.text}`)
        // axios.get(`http://180.149.241.208:3022/getProductBySearchText/${this.state.text}`)
        // .then((res)=>{
        //     console.log(res.data.product_details)
        //     this.setState({products:res.data.product_details})
        //     // console.log(products)
        // })
        // .catch((err)=> {
        //     console.log(err)
        // })
    }
    
    componentDidMount() {
        axios.get(`${api.baseurl}/getCustCartData`) 
        .then((res)=>{     
            console.log(res)
        })
        .catch((err)=> {
            // alert("Wrong API call")
        })
    }

    render() {
        // const {products}=this.state
        // const products_name=products.map(product =><React.Fragment product={product.product_name} id={product.product_id}></React.Fragment>)
        // console.log(products_name)

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
                            {/* <Search></Search> */}
                            <form className="form-inline my-2 my-lg-0">
                                <input className="form-control mr-sm-2" type="search" onChange={this.onChangeHandler} value={this.state.text} placeholder="Search"/>
                            </form>
                            <button className="btn-cart">
                                <NavLink to="/maincart">
                                    <Badge className="badge" anchorOrigin={{vertical: 'top',horizontal: 'right',}} badgeContent={0}>
                                        <i className="fa fa-shopping-cart"></i></Badge>Cart
                                </NavLink>
                            </button>
                            <div className="dropdown">
                                <button className="btn-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <img className="user-avatar" src='' alt='' />
                                    {/* <i class="fa fa-user"></i> */}
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
                                    {/* <Link className="dropdown-item" to='/profile'>Profile</Link>
                                    <Link className="dropdown-item" to='/login'>Login</Link>
                                    <Link className="dropdown-item" to='/register'>Register</Link>
                                    <Link className="dropdown-item" to='/logout'>Log out</Link> */}
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
