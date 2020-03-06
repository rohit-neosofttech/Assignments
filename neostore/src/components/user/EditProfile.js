import React, { Component } from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import axios from 'axios'
import * as api from '../../api'

import CircularProgress from '@material-ui/core/CircularProgress';

import {TextField} from '@material-ui/core/';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import sweetalert from 'sweetalert';
import SnackAlert from '../SnackAlert'

const userToken = localStorage.getItem('userToken')

const emailRegex = RegExp(    
    /^[A-Za-z]{2,}[A-Za-z0-9]{0,}[.]{0,1}[A-Za-z0-9]{1,}[.]{0,1}[A-Za-z0-9]{1,}@[A-Za-z]{2,}[.]{1}[A-za-z]{2,3}[.]{0,1}[a-z]{0,2}$/
);
const textOnly = RegExp(/^[a-zA-Z]*$/);

  
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
            loader:false,
            type:'',
            message:''
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
        var date = e.target.value
        let today = new Date()
        let minDate = new Date()
        minDate.setFullYear(today.getFullYear()-100)
        var selected = new Date(e.target.value)
        console.log(minDate)
        console.log(selected)
        if(selected<today && selected>minDate) {
            var age = selected
            age.setFullYear(age.getFullYear()+18)
            if(age<today) {
                console.log("valid")
                this.setState(prevState => ({
                    dob: date,
                    formErrors: {                  
                        ...prevState.formErrors,   
                        dob: ''
                    }
                }))
            }
            else {
                this.setState(prevState => ({
                    dob: date,
                    formErrors: {                  
                        ...prevState.formErrors,   
                        dob: 'User Must be +18'
                    }
                }))
            }
        }
        else{
            console.log("Invalid")
            this.setState(prevState => ({
                formErrors: {                  
                    ...prevState.formErrors,   
                    dob: 'Enter a Valid Date of Birth'
                }
            }))
        }
        
    }

    onImageChange = e => {
        if(e.target.files.length!==0) {
            const acceptedImageTypes = ['image/jpeg', 'image/png'];
    
            if(e.target.files && acceptedImageTypes.includes(e.target.files[0].type) ) {
                this.setState({ profile_img: e.target.files });
                this.setState(prevState => ({
                    formErrors: {                  
                        ...prevState.formErrors,   
                        profile_img: ''
                    }
                }))
            }
            else {
                this.setState(prevState => ({
                    open:true,
                    type:"error",
                    message:'Invalid format for Profile Image ',
                    formErrors: {                  
                        ...prevState.formErrors,   
                        profile_img: 'The File should be of image format (i.e. jpeg | png)'
                    }
                }))
            }
        }
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
        if (this.state.profile_img==='') {
            sweetalert("Are you sure you want to Update Profile without a Profile Image?", {
                buttons: {
                cancel: 'Cancel',
                confirm: {
                    text: "Confirm",
                    value: "confirm",
                  },
                },
            })
            .then((value) => {
                switch (value) {
            
                case "confirm":
                    this.profileUpdate()
                    break;
                default:
                    
                }
            });
        }
        else {
            this.profileUpdate()
        }
        // if (this.state.profile_img==='') {
        //     if(window.confirm("Are you sure you want to Update Profile without a Profile Image?")) {
        //         this.profileUpdate()
        //     }
        // }
        // else {
        //     this.profileUpdate()
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
                    loader:false
                })
                localStorage.removeItem('CustDetail')
                localStorage.setItem('CustDetail',JSON.stringify(res.data.customer_details))
                sweetalert("Form Submitted!", `${res.data.message}`, "success", {
                    buttons: false, timer:2000,
                })
                .then((value) => {
                    switch (value) {
                      default:
                        this.props.history.push("/profile")
                        // this.forceUpdate()
                        window.location.reload(false)
                    }
                });
            })
            .catch(error => {
                this.setState({loader:false})
                if (error.response) {
                    sweetalert("Error", error.response.data.message ? `${error.response.data.message}` : "Error has occured", "error", {button:false});
                } else if (error.request) {
                    sweetalert("Error", `${error.request}`, "error");
                } else {
                    sweetalert("Error", `${error.message}`, "error");
                }
            });
        }
    }

    profileUpdateCancel = () => {
        this.props.history.push("/profile")
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
                                helperText={this.state.formErrors.firstName!=='' && this.state.formErrors.firstName}
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.firstName!==''}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Last Name"
                                type="text"
                                name="lastName"
                                helperText={this.state.formErrors.lastName!=='' && this.state.formErrors.lastName}
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.lastName!==''}
                            /><br/><br/>
                            
                            <RadioGroup aria-label="gender" name="gender" value={this.state.gender} onChange={this.onRadioChange} style={{display:"inline-block"}}>
                                <FormControlLabel value="Male" control={<Radio />} label="Male" />&emsp;&emsp;
                                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            </RadioGroup>
                            {console.log(this.state.dob)}
                            <input className="form-control" type="date" value={this.state.dob} onChange={(e) => this.setState({dob:e.target.value})} onBlur={this.onDateChange} name="date"/>
                            {this.state.formErrors.dob!=='' ? <><span className="errorMessage">{this.state.formErrors.dob}</span><br/></> : <></>}
                            <br/>

                            <TextField fullWidth
                                label="Mobile Number"
                                type="number"
                                name="mobile"
                                onInput = {(e) =>{
                                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                                  }}
                                onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-' ) && evt.preventDefault() }
                                helperText={this.state.formErrors.mobile!=='' && this.state.formErrors.mobile}
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.mobile!==''}
                            /><br/><br/>

                            <TextField fullWidth
                                label="Email"
                                type="text"
                                name="email"
                                helperText={this.state.formErrors.email!=='' && this.state.formErrors.email}
                                value={this.state.email}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                error={this.state.formErrors.email!==''}
                            /><br/><br/>
                           
                            <input type="file" onChange={this.onImageChange}/>
                            {this.state.formErrors.profile_img!=='' ? <span className="errorMessage">{this.state.formErrors.profile_img}</span> : <></>}
    
                            <br/>
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

                {this.state.open && <SnackAlert open={this.state.open} message={this.state.message} type={this.state.type} handleClose={this.handleSnackClose}/>}

            </div>
        </>
        )
    }
}

export default EditProfile
