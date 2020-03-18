import React, { Component } from 'react'
import Header from '../header/Header'
import AddressSidePanel from './AddressSidePanel'
import CircularProgress from '@material-ui/core/CircularProgress';
import {TextField} from '@material-ui/core/';

import axios from 'axios'
import * as api from '../../api'
import sweetalert from 'sweetalert'

const userToken = localStorage.getItem("userToken")
const textOnly = RegExp(/^[a-zA-Z,.-/ ]*$/);

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

class AddAddress extends Component {
    constructor() {
        super();
        this.state={
            address:null,
            pincode:null,
            city:null, 
            state:null,
            country:null,
            formErrors: {
                address:'',
                pincode:'',
                city:'', 
                state:'',
                country:''
            },
            loader:false,
            open:false,
        }
    }
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        
        switch (name) {
            case "address":
              formErrors.address =
                  (value.length === 0 ? "*required" : "") ||
                  (value.length < 3 ? "minimum 3 characaters required" : "")
              break;
            
            case "pincode":
              formErrors.pincode =
                (isNaN(value) ? "Must Be a number" : "") ||
                (value.length === 0 ? "*required" : "") ||
                (value.length !== 6 ? "Pincode should be of 6 digit" : "")
              break;

            case "city":
              formErrors.city =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") 
                // (value.length < 3 ? "minimum 3 characaters required" : "")
              break;
              
            case "state":
              formErrors.state =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") 
                // (value.length < 3 ? "minimum 3 characaters required" : "")
              break;

            case "country":
              formErrors.country =
                (value.length === 0 ? "*required" : "") ||
                (textOnly.test(value)? "" : "should contain only character") ||
                (value.length < 3 ? "minimum 3 characaters required" : "") 
              break;
            default:
              break;
          }
          
          this.setState({ formErrors, [name]: value });
    };
    
    /**
     * Handle the Form submit, if the form is valid it API call is triggered.
     */
    onSubmitAddress = (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.setState({loader:true})

            axios.post(`${api.baseurl}/address`,{
                address:this.state.address,
                pincode:this.state.pincode,
                city:this.state.city, 
                state:this.state.state,
                country:this.state.country
            }, {
                headers: {
                    Authorization: 'Bearer ' + userToken
                  }
            })
            .then((res) => {
                this.setState({loader:false})
                sweetalert('Address Updated',`${res.data.message}`,"success",{button:false,timer:2500})
                this.props.history.goBack()
            })
            .catch((err) => {
                this.setState({loader:false})
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false,timer:2500})
                    : sweetalert("Oops!", 'Something Went Wrong while updating the Address', "error",{button:false,timer:2500})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false,timer:2500})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false,timer:2500})
                }
            })
        }
    }   

    /**
     * Triggers the SnackBar Close event.
     * 
     * @param   event   contains the component that is been trigger from the event.
     * @param   reason  contains the string that is triggered when user clickes outside the sweetAlert model.
     */
    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false})
    };

    profileUpdateCancel = () => {
            this.props.history.goBack()
    }

    render() {
        return (
            <>
            <Header/>
            <div className="container p-5">
                <h3>My Account</h3><hr/><br/>
                <div className="row">
                    <AddressSidePanel/>
                    <div className="col-md-8 card p-3">
                        <h4>Add New Address</h4><hr/><br/>
                        <form onSubmit={this.onSubmitAddress} autoComplete='off'>
                            <div className="container" style={{padding:"0px 50px"}}>
                            <TextField fullWidth
                                label="Address"
                                type="text"
                                name="address"
                                helperText={this.state.formErrors.address.length > 0 && this.state.formErrors.address}
                                value={this.state.address ? this.state.address : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.address.length > 0}
                            /><br/><br/>
                            {/* <div class="MuiFormControl-root MuiTextField-root" style={{width: "50%"}}>
                                <div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl">
                                    <TextareaAutosize  className="MuiInputBase-input MuiOutlinedInput-input"
                                        type="text"
                                        name="address"
                                        label='Address'
                                        placeholder="Address"
                                        helperText={this.state.formErrors.address.length > 0 && this.state.formErrors.address}
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        onBlur={this.handleChange}
                                        error={this.state.formErrors.address.length > 0}
                                        aria-invalid="false"
                                    />
                                    <fieldset aria-hidden="true" class="PrivateNotchedOutline-root-186 MuiOutlinedInput-notchedOutline">
                                        <legend class="PrivateNotchedOutline-legendLabelled-188"><span>Address</span>
                                        </legend>
                                    </fieldset>
                                </div>
                            </div><br/><br/> */}
                            <div className="d-flex justify-content-between" >
                            <TextField style={{width:'45%'}}
                                label="Pincode"
                                type="number"
                                name="pincode"
                                onInput = {(e) =>{
                                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                                }}
                                onKeyDown={ (evt) => (evt.key === 'e' || evt.key === 'E' || evt.key === '.' || evt.key === '-' || evt.key === '+' ) && evt.preventDefault() }
                                helperText={this.state.formErrors.pincode.length > 0 && this.state.formErrors.pincode}
                                value={this.state.pincode ? this.state.pincode : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.pincode.length > 0}
                            />
                            
                            <TextField style={{width:'45%'}}
                                label="City"
                                type="text"
                                name="city"
                                helperText={this.state.formErrors.city.length > 0 && this.state.formErrors.city}
                                value={this.state.city ? this.state.city : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.city.length > 0}
                            />
                            </div><br/>

                            <div className="d-flex justify-content-between" >
                            <TextField style={{width:'45%'}}
                                label="State"
                                type="text"
                                name="state"
                                helperText={this.state.formErrors.state.length > 0 && this.state.formErrors.state}
                                value={this.state.state ? this.state.state : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.state.length > 0}
                            />
                            <TextField style={{width:'45%'}} 
                                label="Country"
                                type="text"
                                name="country"
                                helperText={this.state.formErrors.country.length > 0 && this.state.formErrors.country}
                                value={this.state.country  ? this.state.country : ''}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.country.length > 0}
                            />
                            </div><br/>
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
                                        <button className="btn-edit" onClick={this.handleSubmit}><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.profileUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>
                                    : 
                                    <>
                                        <button className="btn-edit" onClick={this.handleSubmit} style={{color:'black',backgroundColor:'#cecbcb',cursor:'default'}} disabled><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.profileUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>}
                                </>
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

export default AddAddress
