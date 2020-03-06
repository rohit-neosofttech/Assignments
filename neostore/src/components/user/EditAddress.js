import React, { Component } from 'react'
import Header from '../header/Header'
import AddressSidePanel from './AddressSidePanel'
import * as api from '../../api'
import {TextField} from '@material-ui/core/';

import sweetalert from 'sweetalert'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

const userToken = localStorage.getItem('userToken')

const textOnly = RegExp(/^[a-zA-Z.,/ ]*$/);

  
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
class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address_id:null,
            address:null,
            pincode:null,
            city:null,
            _state:null,
            country:null,
            formErrors : {
                address_id:'',
                address:'',
                pincode:'',
                city:'',
                _state:'',
                country:''
            },
            open:false,
            loader:false
        }
    }

    componentDidMount() {
        this.setState({loader:true})
        if(this.props.location.state.addr) {
            this.setState({
                address_id:this.props.location.state.addr.address_id,
                address:this.props.location.state.addr.address,
                pincode:this.props.location.state.addr.pincode,
                city:this.props.location.state.addr.city,
                _state:this.props.location.state.addr.state,
                country:this.props.location.state.addr.country
            })
        }
        this.setState({loader:false})
    }

    handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "address":
                formErrors.address =
                    (value.length === 0 ? "*required" : "") ||
                    // (textOnly.test(value)? "" : "should contain only character") ||
                    (value.length < 3 ? "minimum 3 characaters required" : "")
                break;
              
            case "pincode":
                formErrors.pincode =
                  (value.length === 0 ? "*required" : "") ||
                  (value.length !== 6 ? "Pincode should be of 6 digit" : "")
                break;
  
            case "city":
                formErrors.city =
                  (value.length === 0 ? "*required" : "") ||
                  (textOnly.test(value)? "" : "should contain only character") ||
                  (value.length < 3 ? "minimum 3 characaters required" : "")
                break;
                
            case "_state":
                formErrors._state =
                  (value.length === 0 ? "*required" : "") ||
                  (textOnly.test(value)? "" : "should contain only character") ||
                  (value.length < 3 ? "minimum 3 characaters required" : "")
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

    onFormSubmit = (e) => {
        e.preventDefault()
        if (formValid(this.state)) {
            this.setState({loader:true})
            
            axios.put(`${api.baseurl}/updateAddress`, {
                address_id:this.state.address_id,
                address:this.state.address,
                pincode:this.state.pincode,
                city:this.state.city,
                state:this.state._state,
                country:this.state.country
            } , {
                headers: {
                Authorization: 'Bearer ' + userToken
                }}
            )
            .then(res => {
                sweetalert("Address Updated",`${res.data.message}`,"success",{button:false})
                this.props.history.push("/address")
                
            })
            .catch(err => {
                this.setState({loader:false,open:true})
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'Something Went Wrong while Updating address', "error",{button:false})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            });

        }
    }

    addressUpdateCancel = () => {
        this.props.history.push("/address")
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
                        <h4>Edit Address</h4><hr/><br/>
                        <form onSubmit={this.onFormSubmit} autoComplete="off"> 
                            <div className="container" style={{padding:"0px 50px"}}>
                            <TextField fullWidth
                                label="Address"
                                type="text"
                                name="address"
                                helperText={this.state.formErrors.address.length > 0 && this.state.formErrors.address}
                                value={this.state.address}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.address.length > 0}
                            /><br/><br/>

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
                                value={this.state.pincode}
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
                                value={this.state.city}
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
                                name="_state"
                                helperText={this.state.formErrors._state.length > 0 && this.state.formErrors._state}
                                value={this.state._state}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors._state.length > 0}
                            />

                            <TextField style={{width:'45%'}}
                                label="Country"
                                type="text"
                                name="country"
                                helperText={this.state.formErrors.country.length > 0 && this.state.formErrors.country}
                                value={this.state.country}
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
                                        <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.addressUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>
                                    :
                                    <>
                                        <button className="btn-edit" type="submit" style={{color:'black',backgroundColor:'#cecbcb',cursor:'default'}} disabled><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                                        <button className="btn-edit" onClick={this.addressUpdateCancel}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                                    </>
                                }
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

export default EditAddress
