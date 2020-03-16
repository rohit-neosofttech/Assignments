import React, { Component } from 'react'
// import Header from './header/Header'
import * as api from '../api'
import axios from 'axios'
import sweetalert from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress';

// import {TextField} from '@material-ui/core/';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
                (value.length === 0 ? "*required" : "") ||
                (value.length !== 4 ? "Must be of 4 digit" : "")

            break;
          
          case "newpass":
            formErrors.newpass = 
                (value.length === 0 ? "*required" : "") ||
                (value.length < 8 ? "minimum 8 characaters required" : "") ||
                (value.length >12 ? "maximum 12 characaters required" : "") ||
                (passRegex.test(value)? "" : "should contain 1 UpperCase, 1 digit & 1 special symbol")
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
            // console.log(this.state.token)
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
                err.response.data.error_message 
                ? sweetalert("Oops!", `${err.response.data.error_message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong while recovering the Password', "error",{button:false})
                } else if (err.request) {
                    sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                    sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            })
        }
    };

    render() {
        return (
            <>
              {/* <Header/>   */}
              <div className="container p-5">
                <div className="card" style={{width:"60%",margin:"auto",backgroundColor:"#eeeeee"}}>
                    <div className="card-body">
                        <h1 className="center">Recovery Password</h1><hr/>
                        <div className="row center">
                            <i id="icon-red" className="fas fa-info-circle fa-lg" style={{paddingRight:"10px",paddingTop:"5px"}}></i>
                            <label style={{color:"red"}}>Verification code has been sent to your registered mail ID</label>
                        </div>
                        <form className="container p-5" onSubmit={this.handleSubmit} noValidate autoComplete='off'>
                            {/* <TextField fullWidth
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
                            /><br/><br/> */}

                            <FormControl variant="outlined" 
                                fullWidth
                                error={this.state.formErrors.code.length > 0}
                            >
                            <InputLabel htmlFor="outlined-adornment-password">Verification code</InputLabel>
                            <OutlinedInput
                                type="number"
                                name="code"
                                value={this.state.code ? this.state.code :''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                onInput = {(e) =>{
                                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)
                                  }}
                                onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-' || evt.key === '+') && evt.preventDefault() }  
                                maxLength="4"
                                labelWidth={150}
                            />
                            <FormHelperText>
                            {this.state.formErrors.code ? this.state.formErrors.code:''}
                            </FormHelperText>
                            </FormControl>
                            <br/><br/>

                            <FormControl variant="outlined" 
                                fullWidth
                                error={this.state.formErrors.newpass.length > 0}
                            >
                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                name="newpass"
                                type={this.state.newpassIcon ? 'text' : 'password'}
                                value={this.state.newpass ? this.state.newpass : ''}
                                onChange={this.handleChange}
                                onKeyUp={this.handleChange}
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
                                {this.state.formErrors.newpass ? this.state.formErrors.newpass: "Password should be of 8-12 characters with a mix of letters, numbers & symbols"}
                            </FormHelperText>
                            </FormControl>
                            <br/><br/>
                            
                            <FormControl variant="outlined" 
                                fullWidth 
                                disabled={this.state.formErrors.newpass!=='' || this.state.newpass===null}
                                error={this.state.formErrors.confpass.length > 0}
                            >
                            <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                            <OutlinedInput
                                name="confpass"
                                type={this.state.confpassIcon ? 'text' : 'password'}
                                value={this.state.confpass ? this.state.confpass :''}
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
                                {this.state.formErrors.confpass.length > 0 && this.state.formErrors.confpass}
                            </FormHelperText>
                            </FormControl>
                            <br/><br/>

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

export default RecoverPass
