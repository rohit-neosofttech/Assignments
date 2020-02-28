import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import User from '../../defaultUser.png'
import axios from 'axios'

import * as api from '../../api'

import './Header.css'
import Search from './Search'

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            cartproducts:[],
            text:'',
            // profile_image:(localStorage.getItem("CustDetail")) ? custDetail.profile_img : null,
            profile_image: null,
            count:0,
            selectedOption:'',
            options:[],
            dropdown:'',
            image:User
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            text:e.target.value
        })
    }
    
    componentDidMount() {
        if(localStorage.getItem('userToken'))
        {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/profile'>Profile</Link>
                            <Link className="dropdown-item" to='/logout'>Log out</Link>
                        </>,
                image: <img className="user-avatar" src={(localStorage.getItem("CustDetail") && this.state.profile_image===null)? User:`${api.baseurl}/${custDetail.profile_img}`} alt='' />
         })
        }
        else {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/login'>Login</Link>
                            <Link className="dropdown-item" to='/register'>Register</Link>
                        </>,
                image:<img className="user-avatar" src={User} alt='' />
            })
        }
        
        axios.get(`${api.baseurl}/getAllProducts`)
        .then((res)=>{
            this.setState({products:res.data.product_details})
        })
        .catch((err) => {
            alert("Wrong API call")
        })

        if(localStorage.getItem('cart')) {
            let count=0
            let cartProduct=JSON.parse(localStorage.getItem('cart')) 
            cartProduct.map(item => count++)
            this.setState({count:count})
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
                            <Search products={this.state.products}></Search>
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
                                    {this.state.image}
                                    </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {this.state.dropdown}
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
