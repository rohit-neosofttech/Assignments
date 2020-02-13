import React from 'react'
import User from '../../defaultUser.png'
import * as api from '../../api'
import { NavLink } from 'react-router-dom';

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

function UserHome() {
    return (
        <div className="col-md-4">
            <div className="center">
                <img className="userImg" src={(custDetail.profile_img===null) ? User : `${api.baseurl}/${custDetail.profile_img}`} alt="Default User"></img><br/>
                <span style={{color:'red',fontWeight:'bold'}}>{`${custDetail.first_name} ${custDetail.last_name}`}</span>
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

export default UserHome

