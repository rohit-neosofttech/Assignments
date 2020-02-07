import React, { Component } from 'react'
import InputFloat from 'react-floating-input'

class ForgotPass extends Component {
    state = {
        inputVal: ''
    }
    render() {
        return (
            <div className="container card pad">
                <h1>Recovery Password</h1>
                <hr/>
                <InputFloat
                    value={this.state.inputVal}
                    onChange={({ target }) => this.setState({ inputVal: target.value })}
                    placeholder="Enter Email" 
                /><br/>
                {/* <input type="email" placeholder=""/> */}
                <button className="btn btn-primary">Submit</button>
            </div>
        )
    }
}

export default ForgotPass
