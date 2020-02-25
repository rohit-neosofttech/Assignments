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
import axios from 'axios'

const userToken = localStorage.getItem('userToken')

class EditAddress extends Component {
    constructor(props) {
        super(props);
        this.state={
            address_id:'',
            address:'',
            pincode:'',
            city:'',
            state:'',
            country:''
        }
    }

    componentDidMount() {
        if(this.props.location.state.addr) {
            this.setState({
                address_id:this.props.location.state.addr.address_id,
                address:this.props.location.state.addr.address,
                pincode:this.props.location.state.addr.pincode,
                city:this.props.location.state.addr.city,
                state:this.props.location.state.addr.state,
                country:this.props.location.state.addr.country
            })
        }
    }

    handleChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value });
    };

    onFormSubmit = () => {
        axios.put(`${api.baseurl}/updateAddress`, {
            address_id:this.state.address_id,
            address:this.state.address,
            pincode:this.state.pincode,
            city:this.state.city,
            state:this.state.state,
            country:this.state.country
        } , {
            headers: {
              Authorization: 'Bearer ' + userToken
            }}
        )
        .then(res => {
            alert("Form submitted");
        })
        .catch(err => {
            alert('Edit Address Error')
        });
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
                        <h4>Edit Address</h4><hr/><br/>
                        <form onSubmit={this.onFormSubmit} autoComplete="off"> 
                            <textarea class="form-control m-2" value={this.state.address} placeholder="Address" 
                                name="address" onChange={this.handleChange} style={{width:'50%'}}/>
                            <input type="text" class="form-control m-2" value={this.state.pincode} placeholder="Pincode" 
                                name="pincode" onChange={this.handleChange} style={{width:'30%'}}/>
                            <input type="text" class="form-control m-2" value={this.state.city} placeholder="City" 
                                name="city" onChange={this.handleChange} style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" value={this.state.state} placeholder="State" 
                                name="state" onChange={this.handleChange} style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" value={this.state.country} placeholder="Country" 
                                name="country" onChange={this.handleChange} style={{width:'30%'}}/>
                            <hr/>
                            <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                            <Link to='/address'><button className="btn-edit" ><i id='icon-black' className="fa fa-times"></i>Cancel</button></Link>
                        </form>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default EditAddress
