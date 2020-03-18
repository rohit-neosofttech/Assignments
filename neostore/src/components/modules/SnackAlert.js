import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';

export class SnackAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:this.props.open,
            message:this.props.message,
            type:this.props.type
        }
    }

    render() {
        return (
            <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={this.state.open} 
            autoHideDuration={2000} onClose={this.props.handleClose} >
            {/* TransitionComponent={<Slide direction="down" />}> */}
                <Slide direction="down" in={true}>
                    <MuiAlert onClose={this.props.handleClose} severity={this.state.type}>
                        {this.state.message}
                    </MuiAlert>
                </Slide>
            </Snackbar>
        )
    }
}

export default SnackAlert
