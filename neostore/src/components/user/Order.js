import React from 'react'
import UserHome from './UserHome'

function Order() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="col-md-7">
                    My Order
                </div>
            </div>
        </div>
    )
}

export default Order
