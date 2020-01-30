import React, { Component } from 'react'

class ForgotPass extends Component {
    render() {
        return (
            <div className="container card pad">
                <h1>Recovery Password</h1>
                <hr/>
                <input type="email" placeholder="Enter Email"/>
                <button className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

export default ForgotPass
