import React, { Component } from 'react'
import './Form.css'
import axios from 'axios';
import * as api from '../api'
import { withRouter } from 'react-router-dom'
import InputFloat from 'react-floating-input'


const emailRegex = RegExp(
    /^[a-zA-Z]+([A-Za-z0-9._-])+@([A-Za-z0-9._-])+.([A-Za-z]{2,4})$/  
  );
  
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
            gender:'male',
            formErrors: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confpass:"",
              mobile:"",
              gender:""
            }
          };
      }
    
    
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      axios.post(`${api.baseurl}/register`, {
        first_name : this.state.firstName,
        last_name : this.state.lastName,
        email : this.state.email,
        pass : this.state.password,
        confirmPass : this.state.confpass,
        phone_no : this.state.mobile,
        gender : this.state.gender
      })
      .then((response) => {
        const { history } = this.props;
        history.push(`/`);
        console.log(response);
      }, (error) => {
        console.log(error);
      });
      alert("Form submitted succesfully");
    } else {
      alert("FORM INVALID");
    }
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          (isNaN(value)? "" : "Only character allowed") ||
          (value.length < 3 ? "minimum 3 characaters required" : "")
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "confpass":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      case "mobile":
        formErrors.mobile =
          value.length !== 10 ? "Invalid Mobile number" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  

    render() {
        return (
            <div className="container">
                <div className="row pad">
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
               
                <form className="container card" onSubmit={this.handleSubmit} noValidate>
                    <br/><h3>Register to NeoSTORE</h3><br/><br/>
                    <div style={{padding:'0px 100px'}}>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="text"
                          value={this.state.firstName}
                          onChange={this.handleChange}
                          placeholder="First Name" 
                          name="firstName" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-font input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.firstName.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.firstName}</span>
                          )}
                      <br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="text"
                          value={this.state.lastName}
                          onChange={this.handleChange}
                          placeholder="Last Name" 
                          name="lastName" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-font input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.lastName.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.lastName}</span>
                          )}
                      <br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="text"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Email" 
                          name="email" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-envelope input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.email.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.email}</span>
                          )}
                      <br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          placeholder="Password" 
                          name="password" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-eye-slash input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.password.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.password}</span>
                          )}
                      <br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="password"
                          value={this.state.confpass}
                          onChange={this.handleChange}
                          placeholder="Confirm Password" 
                          name="confpass" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-eye-slash input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.confpass.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.confpass}</span>
                          )}
                      <br/>

                      <div className="row">
                        <div className="col-sm-10">
                          <InputFloat
                          type="text"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                          placeholder="Mobile" 
                          name="mobile" />
                        </div>
                        <div className="col-sm-2">
                          <i id="icon-black" className="fas fa-mobile-alt input-icon"></i>
                        </div>
                      </div>
                      {this.state.formErrors.lastName.length > 0 && (
                              <span className="errorMessage">{this.state.formErrors.mobile}</span>
                          )}
                      <br/>
                      
                        <input type="radio" name="gender" value="male" checked/> Male <span>&emsp;</span>
                        <input type="radio" name="gender" value="female"/> Female<br/>
                      <div className="createAccount">
                        <button className="btn-login" type="submit">Register</button>
                      </div><br/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Register
