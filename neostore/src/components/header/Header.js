import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import User from '../../defaultUser.png'
import axios from 'axios'
import sweetalert from 'sweetalert'
import * as api from '../../api'

import {connect} from 'react-redux'
import './Header.css'
import Search from './Search'

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            text:'',
            // profile_image:(localStorage.getItem("CustDetail")) ? custDetail.profile_img : null,
            // profile_image: null,
            count:0,
            selectedOption:'',
            options:[],
            dropdown:'',
            image:'',
            img:''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            text:e.target.value
        })
    }
    
    componentDidMount() {
        // var img=''
        // if(localStorage.getItem("CustDetail")) {
        //     if(custDetail.profile_img) {
        //         img=custDetail.profile_img
        //     }
        // }
        if(localStorage.getItem('userToken'))
        {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/profile'>Profile</Link>
                            <Link className="dropdown-item" to='/logout'>Log out</Link>
                        </>,
                // image: <img className="user-avatar" src={(img==='')? User:`${api.baseurl}/${custDetail.profile_img}`} alt='' />
         })
        }
        else {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/login'>Login</Link>
                            <Link className="dropdown-item" to='/register'>Register</Link>
                        </>,
                // image:<img className="user-avatar" src={User} alt='' />
            })
        }
        
        axios.get(`${api.baseurl}/getAllProducts`)
        .then((res)=>{
            this.setState({products:res.data.product_details})
        })
        .catch((err) => {
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong getting Products Data', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
        })

        if(localStorage.getItem('cart')) {
            let count=0
            let cartProduct=JSON.parse(localStorage.getItem('cart')) 
            cartProduct.map(item => count++)
            this.setState({count:count})
        }

        if(localStorage.getItem('userToken')) {
            axios.get(`${api.baseurl}/getCustProfile`, {
                headers:{
                    Authorization: 'Bearer ' + localStorage.getItem('userToken')
                }
            })
            .then((res)=>{
                this.setState({img:res.data.customer_proile.profile_img})
            })
            .catch((err) => {
                console.log(err)
            })
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
                                    // badgeContent={this.state.count}>
                                    badgeContent={this.props.cartCount}>

                                        <i className="fa fa-shopping-cart"></i>
                                    </Badge>Cart
                                </button>
                            </Link>
                            <div className="dropdown">
                                <button className="btn-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {/* {this.state.image} */}
                                    <img className="user-avatar" src={(this.state.img)? `${api.baseurl}/${this.state.img}` : User} alt='' />
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

const mapStateToProps = (state) => {
    return {
        cartCount:state.cartCount
    }
}
 
export default connect(mapStateToProps)(Header)
// export default Header
