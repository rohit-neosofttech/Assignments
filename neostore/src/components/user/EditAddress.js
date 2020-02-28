import React, { Component } from 'react'
import Header from '../header/Header'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as api from '../../api'
import {TextField} from '@material-ui/core/';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'

const userToken = localStorage.getItem('userToken')

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
class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address_id:'',
            address:'',
            pincode:'',
            city:'',
            _state:'',
            country:'',
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
                this.setState({
                    loader:false,
                    open:true,
                    message: res.data.message,
                    type: 'success',
                    title: 'Form Submitted'
                })
                alert("Address Updated")
                this.props.history.push("/address")
                
            })
            .catch(err => {
                this.setState({loader:false,open:true})
                if (err.response) {
                this.setState({
                    message: (err.response.data.message)?err.response.data.message:`Address Edit Error: ${err.response.status}..${err.response.statusText}`,
                    type: 'error',
                    title: 'Address Edit Error'
                })
                // alert(error.response.data.message)
                } else if (err.request) {
                    alert(err.request);
                } else {
                    alert('Error', err.message);
                }
                alert('Encounted Problem while Updating address  ',this.state.message )                
            });

        }
    }

    addressUpdateCancel = () => {
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
                        <h4>Edit Address</h4><hr/><br/>
                        <form onSubmit={this.onFormSubmit} autoComplete="off"> 
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

                            <div style={{display:'inline-block'}}>
                            <TextField style={{paddingRight:'30px'}}
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
                                name="_state"
                                helperText={this.state.formErrors._state.length > 0 && this.state.formErrors._state}
                                value={this.state._state}
                                onChange={this.handleChange}
                                onBlur={this.handleChange}
                                variant='outlined'
                                error={this.state.formErrors._state.length > 0}
                            />
                            </div><br/><br/>

                            <TextField style={{paddingRight:'30px'}}
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
                        </form>
                    </div>
                </div>
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

export default EditAddress
