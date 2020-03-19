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

const CryptoJS = require("crypto-js");

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            text:'',
            count:0,
            selectedOption:'',
            options:[],
            dropdown:'',
            img:'',
            loggedIn:''
        }
    }

    onChangeHandler = (e) => {
        this.setState({
            text:e.target.value
        })
    }
    
    componentDidMount() {
        this.setState({loggedIn:this.props.loggedIn})
        if(localStorage.getItem('userToken'))
        {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/profile'>Profile</Link>
                            <Link className="dropdown-item" to='/logout'>Log out</Link>
                        </>
         })
        }
        else {
            this.setState({
                dropdown:<>
                            <Link className="dropdown-item" to='/login'>Login</Link>
                            <Link className="dropdown-item" to='/register'>Register</Link>
                        </>
            })
        }

        if(localStorage.getItem('userToken')) {
            
            const decDeta = localStorage.getItem('EncrytDetail')
            var bytes  = CryptoJS.AES.decrypt(decDeta, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            console.log(decryptedData)
            var img = decryptedData.customer_details.profile_img
            if(img) {
                this.setState({img:img})
            }
            else {
                this.setState({img:null})
            }
        }
        else {
            localStorage.removeItem('CustDetail')
        }
    }

    componentDidUpdate(prevProps,prevState) {
        if(this.props !== prevProps) {
            if(this.props.loggedIn) {
                const decDeta = localStorage.getItem('EncrytDetail')
                var bytes  = CryptoJS.AES.decrypt(decDeta, 'secret key 123');
                var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                var img = decryptedData.customer_details.profile_img
                if(img) {
                    this.setState({img:img})
                }
                else {
                    this.setState({img:null})
                }
            }
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
                            <li className="nav-item">
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
                            <Search/>
                            <Link to="/maincart">
                                <button className="btn-cart">
                                    <Badge className="badge" anchorOrigin={{vertical: 'top',horizontal: 'right',}} 
                                    // badgeContent={this.state.count}>
                                    badgeContent={this.props.cartCount}>
                                        <i className="fa fa-shopping-cart fa-lg"></i>
                                    </Badge><span >Cart</span>
                                </button>
                            </Link>
                            <div className="dropdown">
                                <button className="btn-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {/* {this.state.image} */}
                                    <img className="user-avatar" src={(this.state.img)? `${api.baseurl}/${this.state.img}` : User} alt='' />
                                    </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {this.state.dropdown}
                                {/* {this.props.loggedIn || localStorage.getItem('userToken') */}
                                {/* {this.props.loggedIn
                                ?
                                <>
                                    <Link className="dropdown-item" to='/profile'>Profile</Link>
                                    <Link className="dropdown-item" to='/logout'>Log out</Link>
                                </>
                                :
                                <>
                                    <Link className="dropdown-item" to='/login'>Login</Link>
                                    <Link className="dropdown-item" to='/register'>Register</Link>
                                </>
                                } */}
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
        cartCount:state.cart.cartCount,
        loggedIn:state.userLogin.loggedIn
    }
}
 
export default connect(mapStateToProps)(Header)
// export default Header
