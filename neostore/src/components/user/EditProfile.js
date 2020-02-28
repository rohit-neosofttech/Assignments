import React, { Component } from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import InputFloat from 'react-floating-input'
import axios from 'axios'
import * as api from '../../api'

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';

import {TextField} from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const userToken = localStorage.getItem('userToken')

const emailRegex = RegExp(/^[a-zA-Z]+([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/);
const textOnly = RegExp(/^[a-zA-Z ]*$/);

  
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

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            gender:'',
            dob:'',
            profile_img:'',
            formErrors: {
                firstName:'',
                lastName:'',
                email:'',
                mobile:'',
                gender:'',
                dob:'',
                profile_img:''
            },
            open:false,
            loader:false
        }
    }
    
    componentDidMount() {
        this.setState({loader:true})
        const profile = this.props.location.state
        this.setState({
            firstName:profile.firstName,
            lastName:profile.lastName,
            email:profile.email,
            mobile:profile.mobile,
            gender:profile.gender,
            dob:profile.dob,
            // profile_img:''
            // img:''
        })
        this.setState({loader:false})
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
        case "firstName":
            formErrors.firstName =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "")
            break;
        case "lastName":
            formErrors.lastName =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "")
            break;
        case "email":
            formErrors.email = 
                (value.length === 0 ? "*required" : "") ||
                (emailRegex.test(value)? "" : "invalid email address")
            break;
        case "mobile":
            formErrors.mobile =
                (value.length === 0 ? "*required" : "") ||
                ((value < 6999999999 || value > 9999999999) ? "Invalid Mobile number" : "" )
            break;
        default:
            break;
        }

        this.setState({ formErrors, [name]: value });
    };

    onDateChange = e => {
        let today = new Date()
        let selected = new Date(e.target.value)
        if(selected<today) {
            console.log("valid")
            this.setState({ dob: e.target.value })
        }
        else{
            console.log("Invalid")
            this.setState({formErrors:{dob:'Enter a Valid Date'}})
        }
        
    }

    onImageChange = e => {
        console.log(e.target.files)
        this.setState({ profile_img: e.target.files });
        // this.setState({ img: e.target.files });
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

    handleProfileUpdate = (e) => {
        e.preventDefault();
        // console.log(this.state.profile_img)

        if (this.state.profile_img==='') {
            if(window.confirm("Are you sure you want to Update Profile without a Profile Image?")) {
                this.profileUpdate()
            }
        }
        else {
            this.profileUpdate()
        }
        // if (formValid(this.state)) {
        //     this.setState({loader:true})
        //     let formData = new FormData()
        //     if(this.state.profile_img==='') {
        //         // formData.append('profile_img',this.state.profile_img)
        //     } else {
        //         formData.append('profile_img',this.state.profile_img[0],this.state.profile_img[0].name)
        //     }
        //     formData.append('first_name',this.state.firstName)
        //     formData.append('last_name',this.state.lastName)
        //     formData.append('email',this.state.email)
        //     formData.append('dob',this.state.dob)
        //     formData.append('phone_no',this.state.mobile)
        //     formData.append('gender',this.state.gender)
        //     console.log("formdata: ",formData)

        //     axios.put(`${api.baseurl}/profile`, formData , {
        //         headers: {
        //         Authorization: 'Bearer ' + userToken
        //         }}
        //     )
        //     .then(res => {
        //         this.setState({
        //             loader:false,
        //             open:true,
        //             message: res.data.message,
        //             type: 'success',
        //             title: 'Form Submitted'
        //         })
        //         localStorage.setItem('CustDetail',JSON.stringify(res.data.customer_details))
        //         alert("Form submitted");
        //         // this.props.history.push("/profile")
        //     })
        //     .catch(error => {
        //         this.setState({loader:false,open:true})
        //         if (error.response) {
        //         this.setState({
        //             message: (error.response.data.message)?error.response.data.message:`Server Error: ${error.response.status}..${error.response.statusText}`,
        //             type: 'error',
        //             title: 'Log in Error'
        //         })
        //         // alert(error.response.data.message)
        //         } else if (error.request) {
        //             alert(error.request);
        //         } else {
        //             alert('Error', error.message);
        //         }
        //         alert('Edit Profile Error')
        //     });
        // }
    };

    profileUpdate = () => {
        if (formValid(this.state)) {
            this.setState({loader:true})
            let formData = new FormData()
            if(this.state.profile_img==='') {
                // formData.append('profile_img',this.state.profile_img)
            } else {
                formData.append('profile_img',this.state.profile_img[0],this.state.profile_img[0].name)
            }
            formData.append('first_name',this.state.firstName)
            formData.append('last_name',this.state.lastName)
            formData.append('email',this.state.email)
            formData.append('dob',this.state.dob)
            formData.append('phone_no',this.state.mobile)
            formData.append('gender',this.state.gender)
            console.log("formdata: ",formData)

            axios.put(`${api.baseurl}/profile`, formData , {
                headers: {
                Authorization: 'Bearer ' + userToken
                }}
            )
            .then(res => {
                this.setState({
                    loader:false,
                    open:true,
                    message: res.data.message,
                    type: 'success',
                    title: 'Form Submitted'
                })
                localStorage.setItem('CustDetail',JSON.stringify(res.data.customer_details))
                alert("Form submitted");
                this.props.history.push("/profile")
            })
            .catch(error => {
                this.setState({loader:false,open:true})
                if (error.response) {
                this.setState({
                    message: (error.response.data.message)?error.response.data.message:`Server Error: ${error.response.status}..${error.response.statusText}`,
                    type: 'error',
                    title: 'Log in Error'
                })
                // alert(error.response.data.message)
                } else if (error.request) {
                    alert(error.request);
                } else {
                    alert('Error', error.message);
                }
                alert('Edit Profile Error ',this.state.message )
            });
        }
    }

    profileUpdateCancel = () => {
        if(window.confirm("All changes will be lost")) {
            this.props.history.push("/profile")
        }
    }

    render() {
        return (
            <>
            <Header/>
            <div className="container">
            <h1>My Account</h1>
            <hr/>
                <div className="row">
                    <UserHome />
                    <div className="col-md-7 card p-3">
                        <h2>Edit Profile</h2>
                        <hr/><br/>
                        <form onSubmit={this.handleProfileUpdate} autoComplete="off">
                            <TextField fullWidth
                                label="First Name"
                                type="text"
                                name="firstName"
                                helperText={this.state.formErrors.firstName.length > 0 && this.state.formErrors.firstName}
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.firstName.length > 0}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Last Name"
                                type="text"
                                name="lastName"
                                helperText={this.state.formErrors.lastName.length > 0 && this.state.formErrors.lastName}
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.lastName.length > 0}
                            /><br/><br/>
                            
                            <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onRadioChange} style={{display:"inline-block"}}>
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />&emsp;&emsp;
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>

                            <input className="form-control" type="date" value={this.state.dob} onChange={this.onDateChange} name="date"/>
                            <br/>
                            {this.state.formErrors.dob.length>0 ? <span className="error">{this.state.formErrors.dob}</span> : <></>}

                            <TextField fullWidth
                                label="Mobile Number"
                                type="number"
                                name="mobile"
                                helperText={this.state.formErrors.mobile.length > 0 && this.state.formErrors.mobile}
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.mobile.length > 0}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Email"
                                type="text"
                                name="email"
                                helperText={this.state.formErrors.email.length > 0 && this.state.formErrors.email}
                                value={this.state.email}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.email.length > 0}
                            /><br/><br/>
                           
                            <input type="file" onChange={this.onImageChange}/><br/>
                            <hr/>
                            {this.state.loader
                                ? 
                                    <div >
                                        <CircularProgress/>
                                    </div>
                                :
                                <>
                                {formValid(this.state) 
                                    ? 
                                    <>
                                        <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.profileUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>
                                    :
                                    <>
                                        <button className="btn-edit" type="submit" style={{color:'black',backgroundColor:'#cecbcb',cursor:'default'}} disabled><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.profileUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>
                                }
                                </>
                            }
                            
                        </form>
                    </div>
                </div><br/><br/><br/>
                {this.state.open && 
                  <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={this.state.open} 
                  autoHideDuration={3000} onClose={this.handleSnackClose} >
                      <Slide direction="down" in={true}>
                          <Alert variant="filled" severity={this.state.type}>
                              <AlertTitle>{this.state.title}</AlertTitle>
                              {this.state.message}
                              <button onClose={this.handleSnackClose}>Close</button>
                          </Alert>
                      </Slide>
                  </Snackbar>
                }
            </div>
        </>
        )
    }
}

export default EditProfile
