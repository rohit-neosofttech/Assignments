import React from 'react'
import {NavLink} from 'react-router-dom'

function ProductsFilter() {
    return (
        <>
            <div class="col-md-3 center">
                <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/order"><button className="userBtn" type="button" ><i id="icon-blue" class="fas fa-archive"></i>Order</button></NavLink>
                <div class="btn-group-vertical">
                    <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/order"><button className="userBtn" type="button" ><i id="icon-blue" class="fas fa-archive"></i>Order</button></NavLink>
                    <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/profile"><button className="userBtn" type="button" ><i id="icon-blue" class="fas fa-user-circle"></i>Profile</button></NavLink>
                    <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/address"><button className="userBtn" type="button"><i id="icon-blue" class="far fa-address-card"></i>Address</button></NavLink>
                    <NavLink className="userBtn-nav" activeClassName="userBtn-active" to="/changepass"><button className="userBtn" type="button" ><i id="icon-blue" class="fas fa-exchange-alt"></i>Change Address</button></NavLink>
                </div>
            </div>
        </>
    )
}

export default ProductsFilter
