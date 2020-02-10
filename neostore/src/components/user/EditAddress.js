import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from '@material-ui/core';

class EditAddress extends Component {
    render() {
        return (
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
                                <ListItem button>
                                    Order
                                </ListItem>
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
                                <ListItem button>
                                    Profile
                                </ListItem><hr/>
                                <ListItem button>
                                    Addresses
                                </ListItem>
                            </List>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                    <div className="col-md-8 card p-3">
                        <h4>Edit Address</h4><hr/><br/>
                        <form>
                            <textarea class="form-control m-2" placeholder="Address" style={{width:'50%'}} />
                            <input type="text" class="form-control m-2" placeholder="Pincode" style={{width:'30%'}}/>
                            <input type="text" class="form-control m-2" placeholder="City" style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" placeholder="State" style={{width:'30%', display:"inline"}}/>
                            <input type="text" class="form-control m-2" placeholder="Country" style={{width:'30%'}}/>
                            <hr/>
                            <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                            <button className="btn-edit"><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAddress
