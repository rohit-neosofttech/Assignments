import React, { Component } from 'react'
import './Form.css'

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
            formErrors: {
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confpass:"",
              mobile:""
            }
          };
      }
    
    
  handleSubmit = e => {
    e.preventDefault();
    if (formValid(this.state)) {
      alert("Form submitted succesfully");
    } else {
      alert("FORM INVALID");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
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
                <form className="container card pad" onSubmit={this.handleSubmit} noValidate>
                    <br/><h3>Register to NeoSTORE</h3><br/><br/>
                    <div className="input-container">
                        <input placeholder="First Name" type="text" name="firstName" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-font"></i>
                    </div>
                    {this.state.formErrors.firstName.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.firstName}</span>
                        )}
                    <br/>
                    <div className="input-container">
                        <input placeholder="Last Name" type="text" name="lastName" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-font"></i>                        
                    </div>
                    {this.state.formErrors.lastName.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.lastName}</span>
                        )}
                    <br/>
                    <div className="input-container">
                        <input placeholder="Email" type="email" name="email" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-envelope"></i>
                    </div>
                    {this.state.formErrors.email.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.email}</span>
                        )}
                    <br/>
                    <div className="input-container">
                        <input placeholder="Password" type="password" name="password" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-eye-slash"></i>
                    </div>
                    {this.state.formErrors.password.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.password}</span>
                        )}
                    <br/>
                    <div className="input-container">
                        <input placeholder="Confirm Password" type="password" name="confpass" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-eye-slash"></i>
                    </div>
                    {this.state.formErrors.confpass.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.confpass}</span>
                        )}
                    <br/>
                    <div className="input-container">
                        <input placeholder="Mobile" type="text" name="mobile" onBlur={this.handleChange} />
                        <i id="icon-black" className="fas fa-mobile-alt"></i>
                    </div>
                    {this.state.formErrors.lastName.length > 0 && (
                            <span className="errorMessage">{this.state.formErrors.mobile}</span>
                        )}
                    <br/>
                    <div>
                    <input type="radio" name="gender" value="male"/> Male <span>&emsp;</span>
                        <input type="radio" name="gender" value="female"/> Female<br/>
                    </div>
                    <div className="createAccount">
                    <button className="btn-login" type="submit">Register</button>
                    </div><br/>
                </form>
            </div>
        )
    }
}

export default Register
