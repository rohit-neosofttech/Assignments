import React, { Component } from 'react'
import Header from '../header/Header'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import {TextField, TextareaAutosize} from '@material-ui/core/';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';

import axios from 'axios'
import * as api from '../../api'

const userToken = localStorage.getItem("userToken")
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

class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:'',
            pincode:'',
            city:'', 
            state:'',
            country:'',
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
                  (textOnly.test(value)? "" : "should contain only character") ||
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
              
            case "state":
              formErrors.state =
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
                this.setState({loader:false,open:true})
                this.setState({
                    message: res.data.message,
                    type: 'success',
                    title: 'Address Form'
                })
                alert("Address Added")
                this.props.history.push('/address')
            })
            .catch((error) => {
                this.setState({loader:false,open:true})
                if (error.response) {
                    this.setState({
                    message: (error.response.data.error_message)?error.response.data.error_message:`Server Error: ${error.response.status}..${error.response.statusText}`,
                    type: 'error',
                    title: 'Contact Form Error'
                })
                } else if (error.request) {
                    alert(error.request);
                } else {
                    alert('Error', error.message);
                }
            })
        }
    }   

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false})
    };

    profileUpdateCancel = () => {
        if(window.confirm("All changes will be lost")) {
            this.props.history.push("/address")
        }
    }

    render() {
        return (
            <>
            <Header/>
            <div className="container p-5">
                <h3>My Account</h3><hr/><br/>
                <div className="row">
                    <div className="col-md-4 p-3">
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="orderPanel"
                            >
                            <Typography>Order</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <List>
                                <Link to="/order">
                                    <ListItem button>Order</ListItem>
                                </Link>
                            </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel><br/>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="accountPanel"
                            >
                            <Typography>Account</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <List>
                                <Link to="/profile">
                                    <ListItem button>Profile</ListItem>
                                </Link><hr/>
                                <Link to='/address'>
                                    <ListItem button>Addresses</ListItem>
                                </Link>
                            </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className="col-md-8 card p-3">
                        <h4>Add New Address</h4><hr/><br/>
                        <form onSubmit={this.onSubmitAddress} autoComplete='off'>
                        <TextField style={{width:'50%'}}
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

                            <TextField style={{width:'30%'}} 
                                label="Pincode"
                                type="number"
                                name="pincode"
                                helperText={this.state.formErrors.pincode.length > 0 && this.state.formErrors.pincode}
                                value={this.state.pincode}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.pincode.length > 0}
                            /><br/><br/>
                            <div style={{display:'inline'}}>
                            <TextField style={{paddingRight:"30px"}}
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

                            <TextField 
                                label="State"
                                type="text"
                                name="state"
                                helperText={this.state.formErrors.state.length > 0 && this.state.formErrors.state}
                                value={this.state.state}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.state.length > 0}
                            />
                            </div><br/><br/>
                            <TextField style={{width:'30%'}} 
                                label="Country"
                                type="text"
                                name="country"
                                helperText={this.state.formErrors.country.length > 0 && this.state.formErrors.country}
                                value={this.state.country}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors.country.length > 0}
                            /><br/><br/>
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
                                    </>}
                                </>
                            } 
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

export default AddAddress
