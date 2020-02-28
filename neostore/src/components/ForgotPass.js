import React, { Component } from 'react'
import Header from './header/Header'
import axios from 'axios';
import * as api from '../api'
import {TextField} from '@material-ui/core/';
import './Form.css'

import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';

const emailRegex = RegExp(
    /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
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
            // customer_id : this.state.customer_id,
            email : this.state.email
          })
          .then((res) => {
            // console.log(res);
            this.setState({loader:false,open:true})
            this.setState({
                message: res.data.message,
                type: 'success',
                title: 'Recovery Password'
            })
            this.props.history.push(`/`)
          })
          .catch((error) => {
            this.setState({loader:false,open:true})
            if (error.response) {
                console.log(error.response)
              this.setState({
                message: (error.response.data.error_message)?error.response.data.error_message:`Server Error: ${error.response.status}..${error.response.statusText}`,
                type: 'error',
                title: 'Error'
              })
              // alert(error.response.data.message)
            } else if (error.request) {
                alert(error.request);
            } else {
                alert('Error', error.message);
            }
          })
        } 
        else {
        //   this.setState(prevState=>({
        //     formErrors: {
        //       email: (prevState.email?prevState.formErrors.email:'*required'),
        //     }
        //   }))
          alert("FORM INVALID");
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
            <Header/>a
            <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div class="card-body">
                        <h1 className="center">Recovery Password</h1>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            <TextField fullWidth
                                label="Email"
                                type="text"
                                name="email"
                                helperText={this.state.formErrors.email.length > 0 && this.state.formErrors.email}
                                value={this.state.email}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.email.length > 0}
                            /><br/><br/>
                            <div className="center">
                            {this.state.loader
                                ? 
                                    <div >
                                        <CircularProgress/>
                                    </div>
                                :
                                 <>
                                  {formValid(this.state) 
                                ? <button className="btn btn-primary" type='submit'>Submit</button>
                                : <button className="btn btn-primary" type='submit' style={{backgroundColor:'gray',cursor:'default'}} disabled>Submit</button>}
                                 </>
                                }  
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.open && 
                    <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={this.state.open} 
                    autoHideDuration={3000} onClose={this.handleSnackClose} >
                        <Slide direction="down" in={true}>
                            <Alert onClose={this.handleSnackClose} variant="filled" severity={this.state.type}>
                                <AlertTitle>{this.state.title}</AlertTitle>
                                {this.state.message}
                            </Alert>
                        </Slide>
                    </Snackbar>
                }
            </div>
            </>
        )
    }
}

export default ForgotPass
