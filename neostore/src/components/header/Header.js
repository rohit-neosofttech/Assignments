import React, { Component } from 'react'
import {NavLink, Link, Redirect} from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import User from '../../defaultUser.png'
import axios from 'axios'

import * as api from '../../api'

import './Header.css'
import Select from "react-select";
import SuggestionInputSearch from 'suggestion-react-input-search'; 
import createHistory from 'history/createBrowserHistory';
import Search from './Search'

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))
const userToken = localStorage.getItem("userToken")

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            cartproducts:[],
            text:'',
            profile_image:(localStorage.getItem("CustDetail")) ? custDetail.profile_img : null,
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
                image: <img className="user-avatar" src={(this.state.profile_image===null)? User:`${api.baseurl}/${this.state.profile_image}`} alt='' />
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
            // const allproduct = res.data.product_details
            this.setState({products:res.data.product_details})
            // let products=[]
            // let temp=[]
            // allproduct.map(product=> products.push(product.product_name))
            // this.setState({options:products})   
             
            // console.log(JSON.stringify(this.state.options))        
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
    
    // handleChange = (selectedOption) => {
    //     // return selectedOption.value
    //     // this.setState({ selectedOption });
    //     // let value= selectedOption.value
    //     // console.log(value)
    //     this.props.history.push(`/productdetail`)
    // };

    // handleOnSubmit(e) {
    //     console.log(e)
    //     let name = e
    //     axios.get(`${api.baseurl}/getAllProducts`)
    //     .then(res => {
    //         const allproduct=res.data.product_details
    //         const product = allproduct.filter(product => product.product_name.toLowerCase() === name.toLowerCase())
    //         // const item = product.map(item =>item)

    //         const history = createHistory();
    //         history.push(`/productDetail/${product[0].product_id}`);
    //     })
    //     .catch(err => {

    //     })
        
    // }

    render() {
        // const { selectedOption } = this.state;
        // const options = this.state.options
        // const recentSearches = ["Winchester Fabric Sofa","Robert Recliner Sofa Set","Apollo Sectional Sofa","Apollo Sectional Sofa green","Robinson","Mou Bed With Mattress","Ursula Lounge Chair","Cooper Rocker Recliner","Danum Swing Chair","Fonteyn Study Table","Blaine Wall Mounted Dining Table","Twain Study Table","Spacewood Riva Queen Bed ","FurnitureKraft Kansas Metal Bed","King Size Wood Bed","HomeTown Bolton Wood Bed ","RjKart Solid Sheesham Chair","Finch Fox Leather Low Back Chair","Mollismoons Lounger Chair","Furny Mint L-Shaped Sofa","Furny Mia Five Seater Sofa ","MemeHO™ Smart ","Shree Jeen Mata Enterprises ","Ebee Brown Laptop Table","Wizard Folding Study Table","Bluewud Noel Coffee Table","BLS Quatra Fabric Sofa","S K Furniture Fontaine Sofa","King Size Bed with Storage","Bharat Lifestyle Dublin Bed","Office Chair in Turquoise","Portable Reclining Yoga Chair","NILKAMAL FREEDOM Almirah","Quirk Portable Foldable Almirah","A3 RBSHOPPY non woven cloth","Portable Triple Door Wardrobe","PrettyKrafts Folding Wardrobe","Cupboard/Wardrobe","HomeTown Three Door Wardrobe","Cello Novelty Big Cupboard "]
        // const placeholder = 'Search films...';
        // const inputPosition = 'center';
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
                            
                            {/* <form className="form-inline my-2 my-lg-0"> */}
                            {/* <SuggestionInputSearch
                                onSubmitFunction={this.handleOnSubmit}
                                recentSearches={recentSearches}
                                placeholder={placeholder}
                                inputPosition={inputPosition}
                                /> */}
                                {/* <Select style={{width:"200px"}}
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.options}
                                    placeholder="Search..."
                                    isSearchable={true}
                                /> */}
                            {/* </form> */}
                            <Search style={{width:"200px"}} products={this.state.products}></Search>
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
