import React, { Component } from 'react'
// import Header from '../header/Header'
import UserHome from './UserHome'
import * as api from '../../api'
import axios from 'axios'
import sweetalert from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const userToken = localStorage.getItem('userToken')

const textOnly = RegExp(/^[a-zA-Z]*$/);
const passRegex = RegExp(/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,12})$/)
  
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

class ChangePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldpass:null,
            newpass:null,
            confpass:null,
            formErrors: {
                oldpass:'',
                newpass:'',
                confpass:'',
            },
            oldpassIcon:false,
            newpassIcon:false,
            confpassIcon:false
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {
          case "oldpass":
            formErrors.oldpass =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test()? "" : "should contain only character") ||
                (value.length < 8 || value.length > 12 ? "Password should contain 8-12 characaters" : "")
            break;
          
          case "newpass":
            formErrors.newpass = 
                (value.length === 0 ? "*required" : "") ||
                (value.length < 8 ? "minimum 8 characaters required" : "") ||
                (value.length >12 ? "maximum 12 characaters required" : "") ||
                (passRegex.test(value)? "" : "should contain 1 UpperCase, 1 digit & 1 special symbol") ||
                this.state.newpass===this.state.oldpass ? "New password should not be same as Old Password" : "";
                if(this.state.confpass!==null) {
                    formErrors.confpass =
                      this.state.newpass!==this.state.confpass ? "the password does not match" : "";
                }
            break;

          case "confpass":
            formErrors.confpass =
                (value.length === 0 ? "*required" : "") ||
                this.state.newpass!==this.state.confpass ? "the password does not match" : "";
            break;
          default:
            break;
        }
    
        this.setState({ formErrors, [name]: value });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.setState({loader:true})
            axios.post(`${api.baseurl}/changePassword`, {
                oldPass : this.state.oldpass,
                newPass : this.state.newpass,
                confirmPass : this.state.confpass
            }, {
                headers: {
                Authorization: 'Bearer ' + userToken
                }}
            )
            .then((res) => {
                this.setState({loader:false})
                this.props.history.push(`/profile`);
                sweetalert("Password Updated!", `${res.data.message}`, "success", {buttons: false})
            })
            .catch((error) => {
                this.setState({loader:false})
                if (error.response) {
                error.response.data.message 
                ? sweetalert("Oops!", `${error.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong while Changing Password', "error",{button:false})
            
                } else if (error.request) {
                    sweetalert("Oops!", `${error.request}`, "error",{button:false})
                } else {
                    sweetalert("Oops!", `${error.message}`, "error",{button:false})
                }
            })
        }
    };

    handleShowOldPass = () => {
        this.setState({oldpassIcon:!this.state.oldpassIcon})
    }

    handleShowNewPass = () => {
        this.setState({newpassIcon:!this.state.newpassIcon})
    }
    
    handleShowConfPass = () => {
        this.setState({confpassIcon:!this.state.confpassIcon})
    }
    
    render() {
        return (
            <>
            {/* <Header/> */}
            <div className="container p-3">
                <h3>My Account</h3>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="container col-md-8">
                        <br/><br/>
                        <div className="card p-5" style={{backgroundColor:"#f9f9f9"}}>
                            <h2 className="center">Change Password</h2>
                            <hr/>
                            <p className="center">NOTE : Password must be : 8-12 Alphanumeric characters</p><br/>
                            <div className="container" style={{width:"70%"}}>
                                <form className="justify-content-center" onSubmit={this.handleSubmit} noValidate autoComplete="off" >
                                    <FormControl variant="outlined" fullWidth error={this.state.formErrors.oldpass.length > 0}>
                                    <InputLabel htmlFor="outlined-adornment-password">Old Password</InputLabel>
                                    <OutlinedInput
                                        name="oldpass"
                                        type={this.state.oldpassIcon ? 'text' : 'password'}
                                        value={this.state.oldpass ? this.state.oldpass : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleShowOldPass}
                                            edge="end"
                                            >
                                            {this.state.oldpassIcon ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={150}
                                    />
                                    <FormHelperText>
                                        {this.state.formErrors.oldpass ? this.state.formErrors.oldpass:''}
                                    </FormHelperText>
                                    </FormControl>
                                    <br/><br/>

                                    <FormControl variant="outlined" fullWidth error={this.state.formErrors.newpass.length > 0}>
                                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                                    <OutlinedInput
                                        name="newpass"
                                        type={this.state.newpassIcon ? 'text' : 'password'}
                                        value={this.state.newpass ? this.state.newpass : ''}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleShowNewPass}
                                            edge="end"
                                            >
                                            {this.state.newpassIcon ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={150}
                                    />
                                    <FormHelperText>
                                        {this.state.formErrors.newpass ? this.state.formErrors.newpass:''}
                                    </FormHelperText>
                                    </FormControl>
                                    <br/><br/>

                                    <FormControl variant="outlined" fullWidth disabled={this.state.formErrors.newpass!=='' || this.state.newpass===null} error={this.state.formErrors.confpass.length > 0}>
                                    <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                                    <OutlinedInput
                                        name="confpass"
                                        type={this.state.confpassIcon ? 'text' : 'password'}
                                        value={this.state.confpass ? this.state.confpass : ''}
                                        onChange={this.handleChange}
                                        onKeyUp={this.handleChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={this.handleShowConfPass}
                                            edge="end"
                                            >
                                            {this.state.confpassIcon ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={150}
                                    />
                                    <FormHelperText>
                                        {this.state.formErrors.confpass ? this.state.formErrors.confpass:''}
                                    </FormHelperText>
                                    </FormControl>
                                    <br/><br/>
                                    {this.state.loader
                                        ? <CircularProgress/>
                                        : <button className="btn btn-primary" onClick={this.handleSubmit} disabled={!formValid(this.state)}>Submit</button>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default ChangePass
