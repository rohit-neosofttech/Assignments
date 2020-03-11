import React, { Component } from 'react'
import Header from './header/Header'
import * as api from '../api'
import axios from 'axios'
import sweetalert from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress';

import {TextField} from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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

class RecoverPass extends Component {
    constructor(props) {
        super(props);
        this.state={
            code:null,
            newpass:null,
            confpass:null,
            formErrors: {
                code:'',
                newpass:'',
                confpass:'',
            },
            newpassIcon:false,
            confpassIcon:false,
            token:''
        }
    }

    componentDidMount() {
        if(this.props.location.state) {
            this.setState({token:this.props.location.state})
        }
        else {
            this.props.history.push('/forgetPass')
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        
        switch (name) {
          case "code":
            formErrors.code =
                (value.length === 0 ? "*required" : "")
            break;
          
          case "newpass":
            formErrors.newpass = 
                (value.length === 0 ? "*required" : "") ||
                (value.length < 8 || value.length > 12 ? "Password should contain 8-12 characaters" : "")
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

    handleShowNewPass = () => {
        this.setState({newpassIcon:!this.state.newpassIcon})
    }
    
    handleShowConfPass = () => {
        this.setState({confpassIcon:!this.state.confpassIcon})
    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            console.log(this.state.token)
            this.setState({loader:true})
            axios.post(`${api.baseurl}/recoverPassword`, {
                otpCode : this.state.code,
                newPass : this.state.newpass,
                confirmPass : this.state.confpass
            }, {
                headers: {
                Authorization: 'bearer ' + this.state.token
                }}
            )
            .then((res) => {
                this.setState({loader:false})
                sweetalert("", 'Account has been recovered successfully', "success",{button:false})
                this.props.history.push(`/login`)
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

    render() {
        console.log(this.props)
        return (
            <>
              <Header/>  
              <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div class="card-body">
                        <h1 className="center">Recovery Password</h1>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            <TextField fullWidth
                                label="Verification code"
                                type="number"
                                name="code"
                                onInput = {(e) =>{
                                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
                                  }}
                                  onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-' || evt.key === '+') && evt.preventDefault() }  
                                helperText={this.state.formErrors.code ? this.state.formErrors.code:''}
                                value={this.state.code}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.code.length > 0}
                            /><br/><br/>

                            <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                name="newpass"
                                type={this.state.newpassIcon ? 'text' : 'password'}
                                value={this.state.newpass}
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
                            </FormControl>
                            {this.state.formErrors.newpass.length > 0 ? <span className="errorMessage">{this.state.formErrors.newpass}</span>: <></>}
                            <br/><br/>
                            
                            <FormControl variant="outlined" fullWidth disabled={this.state.formErrors.newpass!==''}>
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                name="confpass"
                                type={this.state.confpassIcon ? 'text' : 'password'}
                                value={this.state.confpass}
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
                            </FormControl>
                            {this.state.formErrors.confpass.length > 0 ? <span className="errorMessage">{this.state.formErrors.confpass}</span>: <></>}
                            <br/><br/>
                            <div className="center">
                            {this.state.loader
                              ? <CircularProgress/>
                              : <button className="btn btn-primary" type='submit' disabled={!formValid(this.state)}>Submit</button>
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

export default RecoverPass
