import React from 'react'
import UserHome from './UserHome'

export default function Address() {
    return (
        <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div class="row">
                <UserHome />
                <div class="col-md-7">
                    Address
                </div>
            </div>
        </div>
    )
}
