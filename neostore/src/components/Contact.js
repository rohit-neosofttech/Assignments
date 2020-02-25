import React, { Component } from 'react'
import Header from './header/Header'
import {TextField} from '@material-ui/core/';
import './Form.css'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            email:'',
            phone:'',
            subject:'',
            message:''
        }
    }
    
    render() {
        return (
            <>
            <Header/>
            <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto"}}>
                    <div class="card-body">
                        <h1 className="center">Contact Form</h1>
                        <form className="container p-5">
                            <TextField fullWidth label="Name" id="outlined-size-normal" value={this.state.name} 
                                onChange={({ target }) => this.setState({ name: target.value })} variant="outlined" /><br/><br/>
                            <TextField fullWidth label="Email" id="outlined-size-normal" value={this.state.email} 
                                onChange={({ target }) => this.setState({ email: target.value })} variant="outlined" /><br/><br/>
                            <TextField fullWidth label="Phone Number" id="outlined-size-normal" value={this.state.phone} 
                                onChange={({ target }) => this.setState({ phone: target.value })} variant="outlined" /><br/><br/>
                            <TextField fullWidth label="Subject" id="outlined-size-normal" value={this.state.phone} 
                                onChange={({ target }) => this.setState({ phone: target.value })} variant="outlined" /><br/><br/>
                            <TextField fullWidth label="Message" id="outlined-size-normal" value={this.state.message} 
                                onChange={({ target }) => this.setState({ message: target.value })} variant="outlined" /><br/><br/>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Contact
