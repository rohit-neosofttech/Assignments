import React from 'react'
import UserHome from './UserHome'

function ChangePass() {
    return (
        <div className="container p-3">
            <h3>My Account</h3>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="container col-md-8">
                    <br/><br/>
                    <div className="card" style={{backgroundColor:"#f9f9f9"}}>
                        <h2>Change Password</h2>
                        <hr/>
                            
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePass
