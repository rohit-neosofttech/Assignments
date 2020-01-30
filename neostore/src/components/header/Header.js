import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom'
import './Header.css'

export class Header extends Component {
    render() {
        return (
            <div>
                <nav class="navbar navbar-expand-lg">
                    <Link to='/'>
                        <span className="logo">Neo<strong>STORE</strong></span>
                    </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li class="nav-item active">
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/productspage">Product</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/order">Order</NavLink>
                            </li>
                        </ul>
                        
                        <ul class="nav navbar-nav ml-auto">
                            <form class="form-inline my-2 my-lg-0">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search"/>
                            </form>
                            <button className="btn-cart"><NavLink to="/maincart"><i class="fa fa-shopping-cart "></i>Cart</NavLink></button>
                            <div class="dropdown">
                                <button className="btn-dropdown dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-user"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <Link className="dropdown-item" to='/profile'>Profile</Link>
                                    <Link className="dropdown-item" to='/login'>Login</Link>
                                    <Link className="dropdown-item" to='/register'>Register</Link>
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
