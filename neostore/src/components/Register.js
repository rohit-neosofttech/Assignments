import React, { Component } from 'react'
// import Header from './header/Header'
import axios from 'axios';
import * as api from '../api'

import {TextField} from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import CircularProgress from '@material-ui/core/CircularProgress';

import sweetalert from 'sweetalert';


const emailRegex = RegExp(    
  /^[A-Za-z]{2,}[A-Za-z0-9]{0,}[.]{0,1}[A-Za-z0-9]{1,}[.]{0,1}[A-Za-z0-9]{1,}@[A-Za-z]{2,}[.]{1}[A-za-z]{2,3}[.]{0,1}[a-z]{0,2}$/
);
const textOnly = RegExp(/^[a-zA-Z]*$/);
const nameRegex = RegExp(/^[A-Za-z]{1,}[ ]{0,1}[A-Za-z]{1,}[ ]{0,1}[A-Za-z]{1,}[ ]{0,1}[A-Za-z]{1,}$/)
const passRegex = RegExp(/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,12})$/)

  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };

  class Register extends Component {
      constructor(props) {
          super(props);
          this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            confpass:null,
            mobile:null,
            gender:'Male',
            formErrors: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confpass:"",
              mobile:"",
              gender:""
            },
            showPassword:false,
            showConfPassword:false,
            open:false,
            loader:false
          };
      }
    
    
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      this.setState({loader:true})
      axios.post(`${api.baseurl}/register`, {
        first_name : this.state.firstName,
        last_name : this.state.lastName,
        email : this.state.email,
        pass : this.state.password,
        confirmPass : this.state.confpass,
        phone_no : this.state.mobile,
        gender : this.state.gender
      })
      .then((res) => {
        this.setState({loader:false,open:true})
        const { history } = this.props;
        history.push(`/login`);
        sweetalert("Successful Registered!", `${res.data.message}`, "success", {
          buttons: false, timer:2000,
        })
      })
      .catch((error) => {
        this.setState({loader:false,open:true})
        if (error.response) {
          error.response.data.message 
          ? sweetalert("Oops!", `${error.response.data.message}`, "error",{button:false})
          : sweetalert("Oops!", 'Something Went Wrong', "error",{button:false})
    
          // alert(error.response.data.message)
        } else if (error.request) {
            sweetalert("Oops!", `${error.request}`, "error",{button:false})
        } else {
            sweetalert("Oops!", `${error.message}`, "error",{button:false})
        }
      })
    } 
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          (value.length === 0 ? "*required" : "") ||
          (value.length < 3 ? "minimum 3 characaters required" : "") ||
          (nameRegex.test(value)? "" : "enter a valid first name")
        break;
      case "lastName":
        formErrors.lastName =
          (value.length === 0 ? "*required" : "") ||
          (textOnly.test(value)? "" : "should contain only character") 
          // (value.length < 3 ? "minimum 3 characaters required" : "")
        break;
      case "email":
        formErrors.email = 
          (value.length === 0 ? "*required" : "") ||
          (emailRegex.test(value)? "" : "invalid email address")
        break;
      case "password":
        formErrors.password =
          (value.length === 0 ? "*required" : "") ||
          (value.length < 8 ? "minimum 8 characaters required" : "") ||
          (value.length >12 ? "maximum 12 characaters required" : "") ||
          (passRegex.test(value)? "" : "should contain 1 UpperCase, 1 digit & 1 special symbol")
          if(this.state.confpass!==null) {
            formErrors.confpass =
              this.state.password!==this.state.confpass ? "the password does not match" : "";
          }
        break;
      case "confpass":
        formErrors.confpass =
          this.state.password!==this.state.confpass ? "the password does not match" : "";
        break;
      case "mobile":
        if(value.startsWith("+91") === true) {
          var res = value.slice(3,13);
          // console.log(res)
          formErrors.mobile =
            (isNaN(res) ? "Must Be a number" : "") ||
            (res.length === 0 ? "*required" : "") ||
            ((res < 6999999999 || res > 9999999999) ? "Invalid Mobile number" : "" )
        }
        else if(value.startsWith("+") === true) {
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
  
  handleShowPassword = () => {
    this.setState({showPassword:!this.state.showPassword})
  }

  handleShowConfPassword = () => {
    this.setState({showConfPassword:!this.state.showConfPassword})
  }

  onRadioChange = (e) => {
    // console.log(e.target.value)
    this.setState({gender:e.target.value})
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open:false})
  };

    render() {
        return (
          <>
          {/* <Header/> */}
            <div className="container p-5" style={{width:'70%'}}>
                <div className="row">
                    <div className="col col-md-6">
                      <button className="social-btn" style={{backgroundColor: '#3b5998'}}>
                        <i className="fab fa-facebook-f fa-3x"></i>Login with Facebook
                      </button>
                    </div>
                    <div className="col col-md-6">
                      <button className="social-btn" style={{backgroundColor: '#db4437'}}>
                        <i className="fab fa-google fa-3x"></i>Login with Google
                      </button>
                    </div>
                </div>
                <hr/>
                <br/>
               
                <form className="container card" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                    <br/><h3>Register to NeoSTORE</h3><br/><br/>
                    <div style={{padding:'0px 20px'}}>
                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="First Name"
                            type="text"
                            name="firstName"
                            helperText={this.state.formErrors.firstName.length > 0 && this.state.formErrors.firstName}
                            value={this.state.firstName ? this.state.firstName : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            error={this.state.formErrors.firstName.length > 0}
                            />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-font input-icon"></i>
                        </div>
                      </div><br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="Last Name"
                            type="text"
                            name="lastName"
                            helperText={this.state.formErrors.lastName.length > 0 && this.state.formErrors.lastName}
                            value={this.state.lastName ? this.state.lastName : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            error={this.state.formErrors.lastName.length > 0}
                            />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-font input-icon"></i>
                        </div>
                      </div><br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="Email"
                            type="text"
                            name="email"
                            helperText={this.state.formErrors.email.length > 0 && this.state.formErrors.email}
                            value={this.state.email ? this.state.email : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            error={this.state.formErrors.email.length > 0}
                            />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-font input-icon"></i>
                        </div>
                      </div><br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            name="password"
                            helperText={this.state.formErrors.password.length > 0 ? this.state.formErrors.password : "Password should be of 8-12 characters with a mix of letters, numbers & symbols"}
                            value={this.state.password ? this.state.password : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            error={this.state.formErrors.password.length > 0}
                            />
                        </div>
                        <div className="col-sm-2">
                          {
                            this.state.showPassword ? <>
                            <i id="icon-black" className="fas fa-eye input-icon" style={{cursor:'pointer'}} onClick={this.handleShowPassword}></i>
                          </>
                          :<>
                            <i id="icon-black" className="fas fa-eye-slash input-icon" style={{cursor:'pointer'}} onClick={this.handleShowPassword}></i>
                          </>
                          }
                        </div>
                      </div><br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="Confirm Password"
                            type={this.state.showConfPassword ? 'text' : 'password'}
                            name="confpass"
                            helperText={this.state.formErrors.confpass.length > 0 && this.state.formErrors.confpass}
                            value={this.state.confpass ? this.state.confpass : ''}
                            onChange={this.handleChange}
                            onKeyUp={this.handleChange}
                            error={this.state.formErrors.confpass.length > 0}
                            disabled={this.state.formErrors.password!=='' || this.state.password===null}
                            />
                        </div>
                        <div className="col-sm-2">
                          {
                            this.state.showConfPassword ? <>
                            <i id="icon-black" className="fas fa-eye input-icon" style={{cursor:'pointer'}} onClick={this.handleShowConfPassword}></i>
                          </>
                          :<>
                            <i id="icon-black" className="fas fa-eye-slash input-icon" style={{cursor:'pointer'}} onClick={this.handleShowConfPassword}></i>
                          </>
                          }
                        </div>
                      </div><br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <TextField fullWidth
                            // id="outlined-error-helper-text"
                            label="Mobile Number"
                            type="text"
                            name="mobile"
                            // onInput = {(e) =>{
                            //   e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                            // }}
                            // onKeyDown={ (evt) => (evt.key=== 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-') && evt.preventDefault() }
                            onKeyDown={ (evt) => !((evt.keyCode>=96 && evt.keyCode<=105) || (evt.keyCode>=47 && evt.keyCode<=57) ||(evt.keyCode>=37 && evt.keyCode<=40) || evt.key === '+' || evt.keyCode === 8 || evt.keyCode === 46) && evt.preventDefault() }
                                                        
                            helperText={this.state.formErrors.mobile.length > 0 && this.state.formErrors.mobile}
                            value={this.state.mobile ? this.state.mobile : ''}
                            onChange={this.handleChange}
                            onBlur={this.handleChange}
                            error={this.state.formErrors.mobile.length > 0}
                            />
                        </div>
                        <div className="col-sm-2">
                            <i id="icon-black" className="fas fa-mobile-alt input-icon"></i>
                        </div>
                      </div><br/>
                      
                      <div className="row">
                        <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onRadioChange} style={{display:"inline-block"}}>
                          <FormControlLabel value="Male" control={<Radio />} label="Male" />&emsp;&emsp;
                          <FormControlLabel value="Female" control={<Radio />} label="Female" />
                        </RadioGroup>
                      </div>

                      <div>
                      {this.state.loader
                        ? 
                            <div >
                                <CircularProgress/>
                            </div>
                        :
                         <>
                          {formValid(this.state) 
                          ? <button className="btn-login" onClick={this.handleSubmit}>Register</button>
                          : <button className="btn-login" onClick={this.handleSubmit} style={{backgroundColor:'gray',cursor:'default'}} disabled>Register</button>}
                         </>
                      }
                      </div><br/>
                    </div>
                </form>
            </div>
          </>
        )
    }
}

export default Register
