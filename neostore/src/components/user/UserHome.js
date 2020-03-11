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
// import React, { Component } from 'react'
// import User from '../../defaultUser.png'
// import { NavLink } from 'react-router-dom';
// import axios from 'axios'
// import * as api from '../../api'

// const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

// class UserHome extends Component {
//     constructor(props) {
//         super(props);
//         this.state ={
//             img:''
//         }
//     }
    
//     componentDidMount() {
//         if(localStorage.getItem('userToken')) {
//             axios.get(`${api.baseurl}/getCustProfile`, {
//                 headers:{
//                     Authorization: 'Bearer ' + localStorage.getItem('userToken')
//                 }
//             })
//             .then((res)=>{
//                 this.setState({img:res.data.customer_proile.profile_img})
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//         }
//     }
    
//     render() {
//         return (
//             <div className="col-md-4">
//                 <div className="center">
//                     <img className="userImg" src={(this.state.img)? `${api.baseurl}/${this.state.img}` : User} alt="Default User"></img><br/>
//                     <span style={{color:'red',fontWeight:'bold'}}>{`${custDetail.first_name} ${custDetail.last_name}`}</span>
//                     <hr/>
//                     <div className="btn-group-vertical">
//                         <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/order"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-archive"></i>Order</button></NavLink>
//                         <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/profile"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-user-circle"></i>Profile</button></NavLink>
//                         <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/address"><button className="userBtn" type="button"><i id="icon-blue" className="far fa-address-card"></i>Address</button></NavLink>
//                         <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/changepass"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-exchange-alt"></i>Change Password</button></NavLink>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default UserHome



