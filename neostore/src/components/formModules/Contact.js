import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import * as api from '../../api'
import {TextField} from '@material-ui/core/';

import CircularProgress from '@material-ui/core/CircularProgress'
import sweetalert from 'sweetalert'

const emailRegex = RegExp(
    // /^[a-zA-Z]+([A-Za-z0-9._-])+@([A-Za-z0-9._-]{2,5})+.([A-Za-z]{2,4})$/  
    // /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    /^[A-Za-z]{2,}[A-Za-z0-9]{0,}[.]{0,1}[A-Za-z0-9]{1,}[.]{0,1}[A-Za-z0-9]{1,}@[A-Za-z]{2,}[.]{1}[A-za-z]{2,3}[.]{0,1}[a-z]{0,2}$/

  );
// const textOnly = RegExp(/^[a-zA-Z]*$/);
const nameRegex = RegExp(/^[A-Za-z]{1,}[ ]{0,1}[A-Za-z]{1,}[ ]{0,1}[A-Za-z]{1,}$/)

  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === '' && (valid = false);
    });
  
    return valid;
  };


const custDetail = localStorage.getItem('custDetail')

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id:'',
            name:'',
            email:'',
            mobile:'',
            subject:'',
            message:'',
            loader:false,
            open:false,
            formErrors: {
                name: "",
                email: "",
                mobile:"",
                subject:"",
                message:""
              }
        }
    }

    /**
     * Handle the Form submit, if the form is valid it API call is triggered.
     */
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.setState({loader:true})

          axios.post(`${api.baseurl}/contactUs`, {
            // customer_id : this.state.customer_id,
            email : this.state.email,
            name : this.state.name,
            subject : this.state.subject,
            phone_no : this.state.mobile,
            message : this.state.message
          })
          .then((res) => {
            this.setState({loader:false})
            sweetalert("Contact Form Submitted!", `${res.data.message}`, "success",{button:false})
            
            this.props.history.push(`/`)
          })
          .catch((err) => {
            this.setState({loader:false})
            if (err.response) {
              err.response.data.message 
              ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
              : sweetalert("Oops!", 'Something Went Wrong ', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
          })
        }
      };
    
      handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "name":
            formErrors.name =
                (value.length === 0 ? "*required" : "") ||
                (value.length < 3 ? "minimum 3 characaters required" : "") ||
                (nameRegex.test(value)? "" : "enter a valid name")
            break;
          
          case "email":
            formErrors.email = 
                (value.length === 0 ? "*required" : "") ||
                (emailRegex.test(value)? "" : "invalid email address")
            break;

          case "subject":
            formErrors.subject =
                (value.length === 0 ? "*required" : "") ||
                // (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "")
            break;

          case "message":
            formErrors.message =
                (value.length === 0 ? "*required" : "") ||
                // (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "")
            break;

          case "mobile":
            if(value.startsWith("+") === true) {
              formErrors.mobile =
                (isNaN(value) ? "Must Be a number" : "") ||
                (value.length === 0 ? "*required" : "") ||
                ((value.length !==13 ) ? "Invalid Mobile number" : "" )
            }
            else {
              formErrors.mobile =
                (isNaN(value) ? "Must Be a number" : "") ||
                (value.length === 0 ? "*required" : "") ||
                ((value < 6999999999 || value > 9999999999) ? "Invalid Mobile number" : "" )
                // (value.length !== 10 ? "Invalid Mobile number" : "")
            }
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };
    
    componentDidMount() {
        const id = custDetail ? custDetail.customer_id : ''
        this.setState({customer_id:id,})
    }

    render() {
        return (
            <>
            <Header/>
            <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div className="card-body">
                        <h1 className="center">Contact Form</h1>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            <TextField fullWidth 
                                label="Name"
                                type="text"
                                name="name"
                                helperText={this.state.formErrors.name.length > 0 && this.state.formErrors.name}
                                value={this.state.name ? this.state.name : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                margin="normal"
                                error={this.state.formErrors.name.length > 0}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Email"
                                type="text"
                                name="email"
                                helperText={this.state.formErrors.email.length > 0 && this.state.formErrors.email}
                                value={this.state.email ? this.state.email : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.email.length > 0}
                            /><br/><br/>

                            <TextField style={{width:'100%'}}
                                label="Mobile Number"
                                type="text"
                                name="mobile"
                                // onInput = {(e) =>{
                                //   e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                                // }}
                                onKeyDown={ (evt) => !((evt.keyCode>=96 && evt.keyCode<=105) || (evt.keyCode>=47 && evt.keyCode<=57) || evt.key === '+' || evt.keyCode === 8 || evt.keyCode === 46) && evt.preventDefault() }
                                // onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-') && evt.preventDefault() }
                                helperText={this.state.formErrors.mobile.length > 0 && this.state.formErrors.mobile}
                                value={this.state.mobile ? this.state.mobile : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.mobile.length > 0}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Subject"
                                type="text"
                                name="subject"
                                helperText={this.state.formErrors.subject.length > 0 && this.state.formErrors.subject}
                                value={this.state.subject ? this.state.subject : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.subject.length > 0}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Message"
                                type="text"
                                name="message"
                                helperText={this.state.formErrors.message.length > 0 && this.state.formErrors.message}
                                value={this.state.message ? this.state.message : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.message.length > 0}
                            /><br/><br/>
                            <div className="center">
                            {this.state.loader
                                ? 
                                    <div >
                                        <CircularProgress/>
                                    </div>
                                :
                                 <>
                                  <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!formValid(this.state)}>Submit</button>
                                 </>
                                }  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default Contact
