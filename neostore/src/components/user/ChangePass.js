import React, { Component } from 'react'
import UserHome from './UserHome'
import {TextField} from '@material-ui/core/';

class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass:'',
            newpass:'',
            confpass:''
        }
    }
    
    render() {
        return (
            <div className="container p-3">
                <h3>My Account</h3>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="container col-md-8">
                        <br/><br/>
                        <div className="card p-5" style={{backgroundColor:"#f9f9f9"}}>
                            <h2 className="center">Change Password</h2>
                            <hr/>
                            <p className="center">NOTE : Password must be : 8-12 Alphanumeric characters</p><br/>
                            <div className="container" style={{width:"70%"}}>
                                <form className="justify-content-center" noValidate autoComplete="off" >
                                    <TextField fullWidth label="Old Password" id="outlined-size-normal" value={this.state.newpass} 
                                        onChange={({ target }) => this.setState({ newpass: target.value })} variant="outlined" /><br/><br/>
                                    <TextField fullWidth label="New Password" id="outlined-size-normal" value={this.state.oldpass} 
                                        onChange={({ target }) => this.setState({ oldpass: target.value })} variant="outlined" /><br/><br/>
                                    <TextField fullWidth label="Confirm Password" id="outlined-size-normal" value={this.state.confpass} 
                                        onChange={({ target }) => this.setState({ confpass: target.value })} variant="outlined" /><br/><br/>
                                    <button className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePass
