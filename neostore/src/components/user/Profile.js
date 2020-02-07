import React from 'react'
import UserHome from './UserHome'

function Profile() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="col-md-7">
                    Profile
                </div>
            </div>
        </div>
    )
}

export default Profile