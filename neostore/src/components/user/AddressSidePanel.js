import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';

function AddressSidePanel() {
    return (
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
    )
}

export default AddressSidePanel
