import React from 'react'
import UserHome from './UserHome'

function ChangePass() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div class="row">
                <UserHome />
                <div class="col-md-7">
                    Change Password
                </div>
            </div>
        </div>
    )
}

export default ChangePass
