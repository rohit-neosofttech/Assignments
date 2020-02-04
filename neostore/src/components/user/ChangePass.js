import React from 'react'
import UserHome from './UserHome'

function ChangePass() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="col-md-7">
                    Change Password
                </div>
            </div>
        </div>
    )
}

export default ChangePass
