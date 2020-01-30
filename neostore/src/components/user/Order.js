import React from 'react'
import UserHome from './UserHome'

function Order() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div class="row">
                <UserHome />
                <div class="col-md-7">
                    My Order
                </div>
            </div>
        </div>
    )
}

export default Order
