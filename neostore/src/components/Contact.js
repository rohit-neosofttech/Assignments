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
    // /^[a-zA-Z]+([A-Za-z0-9._-])+@([A-Za-z0-9._-]{2,5})+.([A-Za-z]{2,4})$/  
    /^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/
  );
const textOnly = RegExp(
    /^[a-zA-Z ]*$/
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


const custDetail = localStorage.getItem('custDetail')

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer_id:'',
            name:null,
            email:null,
            mobile:null,
            subject:null,
            message:null,
            loader:false,
            open:false,
            formErrors: {
                name: "",
                email: "",
                mobile:"",
                subject:"",
                message:""
              },
        }
    }

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
            this.props.history.push(`/`)
            // console.log(res);
            this.setState({loader:false,open:true})
            this.setState({
                mess: res.data.message,
                type: 'success',
                title: 'Contact Form'
            })
          })
          .catch((error) => {
            this.setState({loader:false,open:true})
            if (error.response) {
                console.log(error.response)
              this.setState({
                mess: (error.response.data.error_message)?error.response.data.error_message:`Server Error: ${error.response.status}..${error.response.statusText}`,
                type: 'error',
                title: 'Contact Form Error'
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
        //       name: (prevState.name?prevState.formErrors.name:'*required'),
        //       email: (prevState.email?prevState.formErrors.email:'*required'),
        //       mobile: (prevState.mobile?prevState.formErrors.mobile:'*required'),
        //       subject: (prevState.subject?prevState.formErrors.subject:'*required'),
        //       message: (prevState.message?prevState.formErrors.message:'*required')
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
          case "name":
            formErrors.name =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "")
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
            formErrors.mobile =
              (value.length === 0 ? "*required" : "") ||
              ((value < 6999999999 || value > 9999999999) ? "Invalid Mobile number" : "" )
              // (value.length !== 10 ? "Invalid Mobile number" : "")
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
      };
    
    componentDidMount() {
        const id = custDetail ? custDetail.customer_id : ''
        this.setState({customer_id:id})
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
            <Header/>
            <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div class="card-body">
                        <h1 className="center">Contact Form</h1>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            <TextField fullWidth
                                label="Name"
                                type="text"
                                name="name"
                                helperText={this.state.formErrors.name.length > 0 && this.state.formErrors.name}
                                value={this.state.name}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.name.length > 0}
                            /><br/><br/>

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

                            <TextField style={{width:'100%'}}
                                label="Mobile Number"
                                type="number"
                                name="mobile"
                                helperText={this.state.formErrors.mobile.length > 0 && this.state.formErrors.mobile}
                                value={this.state.mobile}
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
                                value={this.state.subject}
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
                                value={this.state.message}
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
                                {this.state.mess}
                            </Alert>
                        </Slide>
                    </Snackbar>
                }
            </div>
            </>
        )
    }
}

export default Contact
