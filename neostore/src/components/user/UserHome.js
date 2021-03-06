import React, { Component } from 'react'
import User from '../../defaultUser.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios'
import * as api from '../../api'

const CryptoJS = require("crypto-js");

class UserHome extends Component {
    constructor(props) {
        super(props);
        this.state ={
            img:'',
            name:''
        }
    }
    
    componentDidUpdate(prevPros) {
        if(prevPros!==this.props) {
            if(localStorage.getItem("EncrytDetail")) {

                const decDeta = localStorage.getItem('EncrytDetail')
                var bytes  = CryptoJS.AES.decrypt(decDeta, 'secret key 123');
                var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                var img = decryptedData.customer_details.profile_img
                // var img = cust.profile_img
                if(img) {
                    this.setState({img:img})
                }
                else {
                    this.setState({img:null})
                }
    
                var name = `${decryptedData.customer_details.first_name} ${decryptedData.customer_details.last_name}`
                this.setState({name:name})
            }
            else {
                this.setState({img:null})
            }
        }
    }
    
    render() {
        return (
            <div className="col-md-4">
                <div className="center">
                    <img className="userImg" src={(this.state.img)? `${api.baseurl}/${this.state.img}` : User} alt="Default User"></img><br/>
                    <span style={{color:'red',fontWeight:'bold'}}>{this.state.name}</span>
                    <hr/>
                    <div className="btn-group-vertical">
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/order"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-archive"></i>Order</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/profile"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-user-circle"></i>Profile</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/address"><button className="userBtn" type="button"><i id="icon-blue" className="far fa-address-card"></i>Address</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/changepass"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-exchange-alt"></i>Change Password</button></NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserHome



