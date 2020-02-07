import React, { Component } from 'react'
import InputFloat from 'react-floating-input'
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
            <div className="container">
                <div className="card">
                    <div class="card-body">
                        <h1 className="center">Contact Form</h1>
                        <form>
                            <InputFloat 
                                value={this.state.name}
                                onChange={({ target }) => this.setState({ name: target.value })}
                                placeholder="Name" /><br/>
                            <InputFloat 
                                value={this.state.email}
                                onChange={({ target }) => this.setState({ email: target.value })} 
                                placeholder="Email" /><br/>
                            <InputFloat 
                                value={this.state.phone}
                                onChange={({ target }) => this.setState({ phone: target.value })}
                                placeholder="Phone Number" /><br/>
                            <InputFloat 
                                value={this.state.subject}
                                onChange={({ target }) => this.setState({ subject: target.value })}
                                placeholder="Subject" /><br/>
                            <InputFloat 
                                value={this.state.message}
                                onChange={({ target }) => this.setState({ message: target.value })}
                                placeholder="Message" /><br/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
