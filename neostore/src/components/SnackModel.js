import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { Alert, AlertTitle } from '@material-ui/lab';


class SnackModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:this.props.open,
            message:this.props.message,
            title:this.props.title,
            type:this.props.type
        }
    }

    render() {
        console.log('Model',this.props)
        return (
            <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={this.state.open} 
            autoHideDuration={3000} onClose={this.props.handleClose} >
            {/* TransitionComponent={<Slide direction="down" />}> */}
                <Slide direction="down" in={true}>
                    <Alert onClose={this.props.handleClose} variant="filled" severity={this.state.type}>
                        <AlertTitle>{this.state.title}</AlertTitle>
                        {this.state.message}
                    </Alert>
                </Slide>
            </Snackbar>
        )
    }
}

export default SnackModel
