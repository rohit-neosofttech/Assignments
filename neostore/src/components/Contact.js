import React, { Component } from 'react'
import './Form.css'

class Contact extends Component {
    render() {
        return (
            <div className="container">
                <div className="card">
                    <div class="card-body">
                        <h1 className="center">Contact Form</h1>
                        <form>
                            <div class="form-group form-input">
                                <input type="text" name="name" id="name" value="" required/>
                                <label for="name" class="form-label">Name</label>
                            </div>
                            <div class="form-group form-input">
                                <input type="email" name="email" id="email" value="" required/>
                                <label for="email" class="form-label">Email</label>
                            </div>
                            <div class="form-group form-input">
                                <input type="number" name="phone" id="phone" value="" required />
                                <label for="phone" class="form-label">Mobile number</label>
                            </div>
                            <div class="form-group form-input">
                                <input type="text" name="subject" id="subject" value="" required/>
                                <label for="subject" class="form-label">Subject</label>
                            </div>
                            <div class="form-group form-input">
                                <input type="text" name="message" id="message" value="" required/>
                                <label for="message" class="form-label">Message</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact
