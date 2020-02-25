import React, { Component } from 'react'
import Header from '../header/Header'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

import axios from 'axios'
import * as api from '../../api'

const userToken = localStorage.getItem("userToken")


class AddAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address:'',
            pincode:'',
            city:'', 
            state:'',
            country:''
        }
    }
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }, () => console.log(this.state));
    };
    
    onSubmitAddress = () => {
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
        .then((res)=>{
            console.log(res)
        })
        .catch((err) => {
            // alert('Invalid Address API call')
        })
        this.props.history.push("/address")
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
                        <form onSubmit={this.onSubmitAddress}>
                            <textarea class="form-control m-2" placeholder="Address" name="address" 
                                value={this.state.address} onChange={this.handleChange} style={{width:'50%'}} />
                            <input type="text" class="form-control m-2" placeholder="Pincode" name="pincode" 
                                value={this.state.pincode} onChange={this.handleChange}style={{width:'30%'}}/>
                            <input type="text" class="form-control m-2" placeholder="City" name="city" 
                                value={this.state.city} onChange={this.handleChange} style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" placeholder="State" name="state" 
                                value={this.state.state} onChange={this.handleChange} style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" placeholder="Country" name="country" 
                                value={this.state.country} onChange={this.handleChange} style={{width:'30%'}}/>
                            <hr/>
                            <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                            <button className="btn-edit"><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default AddAddress
