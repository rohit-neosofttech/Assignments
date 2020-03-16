import React, { Component } from 'react'
// import Header from './header/Header'
import axios from 'axios';
import * as api from '../api'
import {TextField} from '@material-ui/core/';

import CircularProgress from '@material-ui/core/CircularProgress';
import sweetalert from 'sweetalert'

const emailRegex = RegExp(
    // /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.]+)\.([A-Za-z]{2,4})$/
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

class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:null,
            loader:false,
            open:false,
            formErrors: {
                email: "",
              }
        }
    }
    
    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
          this.setState({loader:true})
          axios.post(`${api.baseurl}/forgotPassword`, {
            email : this.state.email
          })
          .then((res) => {
            this.setState({loader:false})
            this.props.history.push(`/recoverPass`,res.data.token)
          })
          .catch((err) => {
            this.setState({loader:false})
            if (err.response) {
              err.response.data.message 
              ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
              : sweetalert("Oops!", 'Something Went Wrong getting Company Data', "error",{button:false})
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
          case "email":
            formErrors.email = 
                (value.length === 0 ? "*required" : "") ||
                (emailRegex.test(value)? "" : "invalid email address")
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };

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
            <div className="container p-5" style={{minHeight:'400px'}}>
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div className="card-body">
                        <h1 className="center">Recovery Password</h1>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            <TextField fullWidth
                                label="Email"
                                type="text"
                                name="email"
                                helperText={this.state.formErrors.email.length > 0 && this.state.formErrors.email}
                                value={this.state.email ? this.state.email :''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.email.length > 0}
                            /><br/><br/>
                            <div className="center">
                            {this.state.loader
                              ? <CircularProgress/>
                              : <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!formValid(this.state)}>Submit</button>
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

export default ForgotPass
