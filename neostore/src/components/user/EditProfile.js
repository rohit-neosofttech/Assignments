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

        axios.get(`${api.baseurl}/getCustProfile`, {
            headers: {
              Authorization: 'Bearer ' + userToken
            }}
        )
        .then(res => {
            this.setState({loader:false,open:true})
            const profile = res.data.customer_proile
            // console.log(profile)
            this.setState({
                firstName:profile.first_name,
                lastName:profile.last_name,
                email:profile.email,
                mobile:profile.phone_no,
                gender:profile.gender,
                dob:profile.dob
                // profile_img:profile.profile_img
            })
        })
        .catch(err => {
            console.log(err)
            alert("invalid api call")
            this.setState({loader:false,open:true})
            if (err.response) {
            this.setState({
                message: (err.response.data.message)?err.response.data.message:`Server Error: ${err.response.status}..${err.response.statusText}`,
                type: 'error',
                title: 'Error while Edidding the Profile'
            })
            // alert(error.response.data.message)
            } else if (err.request) {
                alert(err.request);
            } else {
                alert('Error', err.message);
            }
        });
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
    }

    onRadioChange = (e) => {
        // console.log(e.target.value)
        this.setState({gender:e.target.value})
    }

    handleProfileUpdate = (e) => {
        e.preventDefault();
        console.log(this.state.profile_img)
        if (formValid(this.state)) {
            this.setState({loader:true})
            let formData = new FormData()
            if(this.state.profile_img==='') {
                formData.append('profile_img',null,null)
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
                // alert("Form submitted");
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
                // alert('Edit Profile Error')
            });
        }
    };

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
                        <form onSubmit={this.handleProfileUpdate}>
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
                            {/* <InputFloat style={{fontSize:'24px'}}
                                        value={this.state.firstName}
                                        onChange={this.handleChange}
                                        placeholder="First Name" 
                                        name="firstName" 
                                        /><br/>

                            <InputFloat style={{fontSize:'24px'}}
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        placeholder="Last Name" 
                                        name="lastName" /><br/>
                             */}
                            <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onRadioChange} style={{display:"inline-block"}}>
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />&emsp;&emsp;
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>

                            {/* <input type="radio" name="gender" value="male" onChange={()=>this.onRadioChange()} checked/> Male <span>&emsp;</span>
                            <input type="radio" name="gender" value="female" onChange={this.onRadioChange} /> Female<br/><br/> */}

                            <input className="form-control" type="date" value={this.state.dob} onChange={this.onDateChange} name="date"/>
                            <br/>
                            {this.state.formErrors.dob.length>0 ? <span className="error">{this.state.formErrors.dob}</span> : <></>}

                            <InputFloat style={{fontSize:'24px'}}
                                        value={this.state.mobile}
                                        onChange={this.handleChange}
                                        placeholder="Mobile" 
                                        name="mobile" /><br/>

                            <InputFloat style={{fontSize:'24px'}}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        placeholder="Email Address" 
                                        name="email" /><br/>

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
                                ? <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>
                                : <button className="btn-edit" type="submit" style={{backgroundColor:'gray',cursor:'default'}} disabled><i id='icon-black' className="fa fa-save"></i>Save</button>}
                                </>
                            }
                            &emsp;&emsp;<button className="btn-edit" onClick={()=>this.props.history.push("/profile")}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                        </form>
                    </div>
                </div><br/><br/><br/>
            </div>
        </>
        )
    }
}

export default EditProfile
