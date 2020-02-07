import React, { Component } from 'react'
import { Link } from 'react-router-dom';
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
  
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            formErrors: {
                email: "",
                password: ""
              }
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
    
        if (formValid(this.state)) {
          console.log(`
            --SUBMITTING--
            Email: ${this.state.email}
            Password: ${this.state.password}
          `);
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };

      handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
    
        switch (name) {
          case "email":
            formErrors.email = emailRegex.test(value)
              ? ""
              : "invalid email address";
            break;
          case "password":
            formErrors.password =
              value.length < 6 ? "minimum 6 characaters required" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
      };


    render() {
        return (
            <div className="container pad">
                <div className="row">
                    <div className="col-md-6">
                        <button className="social-btn" style={{backgroundColor: '#3b5998'}}>
                          <i className="fab fa-facebook-f fa-3x"></i>Login with Facebook
                        </button>
                        <button className="social-btn" style={{backgroundColor: '#db4437'}}>
                          <i className="fab fa-google fa-3x"></i>Login with Google
                        </button>
                        <button className="social-btn" style={{backgroundColor: '#00acee'}}>
                          <i className="fab fa-twitter fa-3x"></i>Login with Twitter
                        </button>
                    </div>
                    <div className="col-md-6 left-border">
                        <div>
                            <label><h3>Login to NeoSTORE</h3></label>
                            <div className="container-fullwidth">
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-container">
                                    <input type="email" placeholder="Email Address" onChange={this.handleChange} name="email"/>
                                    <i id="icon-black" className="fas fa-envelope"></i>
                                </div>
                                    {this.state.formErrors.email.length > 0 && (
                                        <span className="errorMessage">{this.state.formErrors.email}</span>
                                    )}
                                <br/>
                                <div className="input-container">
                                    <input type="password" placeholder="Password" onChange={this.handleChange} name="password"/>
                                    <i id="icon-black" className="fas fa-eye-slash"></i>
                                </div>
                                {this.state.formErrors.password.length > 0 && (
                                        <span className="errorMessage">{this.state.formErrors.password}</span>
                                    )}
                                <br/><br/>
                                <button className="btn-login">Login</button>
                            </form>
                            </div>
                            <hr/>
                        </div>
                    </div>
                </div>
                <div className="center pad">
                    <pre>
                        <Link to="/register">Resgister Now</Link>   |  <Link to="/forgot-pass">Forgotten?</Link> 
                    </pre>
                    
                </div>
            </div>
        )
    }
}

export default Login
