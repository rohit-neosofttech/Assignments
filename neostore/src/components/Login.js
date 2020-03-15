import React, { Component } from 'react'
import Header from './header/Header'
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as api from '../api'
import { TextField } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import sweetalert from 'sweetalert'

const emailRegex = RegExp(
    // /^[a-zA-Z]+([A-Za-z0-9._-])+@([A-Za-z0-9._-])+.([A-Za-z]{2,4})$/
    // /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
    /^[A-Za-z]{2,}[A-Za-z0-9]{0,}[.]{0,1}[A-Za-z0-9]{1,}[.]{0,1}[A-Za-z0-9]{1,}@[A-Za-z]{2,}[.]{1}[A-za-z]{2,3}[.]{0,1}[a-z]{0,2}$/
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
            email: null,
            password: null,
            loader: false,
            open: false,
            type: '',
            message: '',
            title: '',
            formErrors: {
                email: "",
                password: ""
            }
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.setState({ loader: true })

            axios.post(`${api.baseurl}/login`, {
                    email: this.state.email,
                    pass: this.state.password
                })
                .then((res) => {
                    this.getPreviousCart(res.data.token)
                    localStorage.setItem('userToken', `${res.data.token}`)
                    localStorage.setItem('CustDetail', JSON.stringify(res.data.customer_details))
                    this.setState({ loader: false })
                    sweetalert(res.data.message, { icon: "success", button: false, timer: 2000, })
                        .then((value) => {
                            switch (value) {
                                default: this.props.history.push(`/`);
                                // window.location.reload(false)
                            }
                        });
                })
                .catch((error) => {
                    this.setState({ loader: false })
                    if (error.response) {
                        sweetalert("Error", error.response.data.message ? `${error.response.data.message}` : "Error has occured", "error", { button: false, timer: 2000, });
                    } else if (error.request) {
                        sweetalert("Error", `${error.request}`, "error", { button: false, timer: 2000, });
                    } else {
                        sweetalert("Error", `${error.message}`, "error", { button: false, timer: 2000, });
                    }
                });
        }
    };

    getPreviousCart = (token) => {
        axios.get(`${api.baseurl}/getCartData`, {
                headers: {
                    Authorization: 'bearer ' + token
                }
            })
            .then((res) => {
                // console.log('getCart',res)
                let oldCart = JSON.parse(localStorage.getItem('cart'))
                let newItem
                let tempCart = []
                if (oldCart === null) {
                    oldCart = []
                }
                let product_details = res.data.product_details
                if (product_details.length !== 0) {
                    product_details.map(product =>
                        <React.Fragment key={product._id}>
                            {newItem = product.product_id}
                            {newItem['quantity'] = product.quantity}
                            {newItem['total'] = product.quantity * product.product_cost}
                            {tempCart.push(newItem)}
                        </React.Fragment>
                    )
                }
                // console.log(`length:${tempCart.length}...${oldCart.length}`)
                // if(tempCart.length!==0 && oldCart.length!==0) {
                //   let cart = tempCart.map((item, i) => Object.assign({}, item, oldCart[i]));
                //   localStorage.setItem('tempCart',JSON.stringify(tempCart))
                //   localStorage.setItem('cart',JSON.stringify(cart))
                // }
                // else if(tempCart.length!==0 && oldCart.length===0) {
                //   localStorage.setItem('tempCart',JSON.stringify(tempCart))
                //   localStorage.setItem('cart',JSON.stringify(tempCart))
                // }

                // var cart = [...new Set([...oldCart, ...tempCart])];
                if (tempCart.length !== 0) {
                    localStorage.setItem('cart', JSON.stringify(tempCart))
                }

            })
            .catch((err) => {
                // console.log(err)
                // alert("There is a problem fetching your previous cart")
            })
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = {...this.state.formErrors };

        switch (name) {
            case "email":
                formErrors.email =
                    (value.length === 0 ? "*required" : "") ||
                    (emailRegex.test(value) ? "" : "invalid email address")
                break;
            case "password":
                formErrors.password =
                    (value.length === 0 ? "*required" : "") ||
                    (value.length < 8 ? "minimum 8 characaters required" : "") ||
                    (value.length > 12 ? "maximum 12 characaters required" : "")
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });
    };

    handleShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false })
    };

    render() {
        return (
            <>
            <Header/>
              <div className="container p-5">
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
                                  <div className="row">
                                    <div className="col-sm-10">
                                      <TextField fullWidth
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
                                      <i id="icon-black" className="fas fa-envelope input-icon"></i>
                                    </div>
                                  </div><br/>
  
                                  <div className="row">
                                    <div className="col-sm-10">
                                      <TextField fullWidth
                                        // id="outlined-error-helper-text"
                                        label="Password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        name="password"
                                        helperText={this.state.formErrors.password.length > 0 ? this.state.formErrors.password : "Password should be of 8-12 characters"}
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
                                  </div>
                                  <br/><br/>
                                  {this.state.loader
                                  ? 
                                      <div >
                                          <CircularProgress/>
                                      </div>
                                  :
                                   <>
                                    {formValid(this.state) 
                                    ? <button className="btn-login" type='submit'>Login</button>
                                    :<button className="btn-login" type='submit' style={{backgroundColor:'gray',cursor:'default'}} disabled>Login</button>}
                                   </>
                                  }             
                                  
                              </form>
                              </div>
                              <hr/>
                          </div>
                      </div>
                  </div>
                  <div className="center p-3">
                      <pre>
                          <Link to="/register">Register Now</Link>   |  <Link to="/forgotPass">Forgotten?</Link> 
                      </pre>
                  </div>
              </div>
            </>
        )
    }
}

export default Login