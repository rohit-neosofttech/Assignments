import React, { Component } from 'react'

export class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('CustDetail')
        localStorage.removeItem('userToken')
        
        const { history } = this.props;
        history.push(`/`);
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Logout
