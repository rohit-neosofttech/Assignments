import React, { PureComponent } from 'react'
import User from '../../defaultUser.png'
import { NavLink } from 'react-router-dom';

export class UserHome extends PureComponent {
    render() {
        return (
            <>
                <div className="col-md-5 center">
                    <img className="userImg" src={User} alt="Default User"></img>
                    <hr/>
                    <div className="btn-group-vertical">
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/order"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-archive"></i>Order</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/profile"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-user-circle"></i>Profile</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/address"><button className="userBtn" type="button"><i id="icon-blue" className="far fa-address-card"></i>Address</button></NavLink>
                        <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/changepass"><button className="userBtn" type="button" ><i id="icon-blue" className="fas fa-exchange-alt"></i>Change Address</button></NavLink>
                    </div>
                </div>
            </>
        )
    }
}

export default UserHome
