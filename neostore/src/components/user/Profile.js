
import React, { PureComponent } from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import * as api from '../../api'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import sweetalert from 'sweetalert'


// const UserHome = React.lazy(() => import('./UserHome'))


const CryptoJS = require("crypto-js");

class Profile extends PureComponent {
    constructor(props) {
        super(props);
        this.state ={
            firstName:'',
            lastName:'',
            email:'',
            mobile:'',
            gender:'',
            dob:'',
            profile_img:'',
            loader:false
        }
    }
    
    componentDidMount() {
        this.setState({loader:true})
        if(localStorage.getItem('userToken')) {
            const decDeta = localStorage.getItem('EncrytDetail')

            var bytes  = CryptoJS.AES.decrypt(decDeta, 'secret key 123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            this.setState({
                    firstName : decryptedData.customer_details.first_name,
                    lastName : decryptedData.customer_details.last_name,
                    email : decryptedData.customer_details.email,
                    dob : decryptedData.customer_details.dob,
                    mobile : decryptedData.customer_details.phone_no,
                    gender : decryptedData.customer_details.gender,
                    loader:false
            })
        }
    }

    handleClick = (e) => {
        this.props.history.push('/editProfile',this.state);
    }

    render() {
        var newDob
        if(this.state.dob!==null) {
            var date = new Date(this.state.dob)
            newDob = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
        } 
        else {
            newDob = `xx-xx-xxxx`
        }
        return (
            <>
            <Header/>
            <div className="container p-3">
                <h3>My Account</h3>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="col-md-8 card p-3" >
                        <h2>Profile</h2>
                        <hr/><br/>
                        {this.state.loader
                        ? 
                            <div className="center" >
                                <CircularProgress/>
                            </div>
                        :
                        <>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{width:"30%"}}>First Name :</td><td>{this.state.firstName}</td>
                                </tr>
                                <tr>
                                    <td style={{width:"30%"}}>Last Name :</td><td>{this.state.lastName}</td>
                                </tr>
                                <tr>
                                    <td style={{width:"30%"}}>Gender :</td><td>{this.state.gender}</td>
                                </tr>
                                <tr>
                                    <td style={{width:"30%"}}>Date of Birth :</td><td>{newDob}</td>
                                </tr>
                                <tr>
                                    <td style={{width:"30%"}}>Mobile Number :</td><td>{this.state.mobile}</td>
                                </tr>
                                <tr>
                                    <td style={{width:"30%"}}>Email :</td><td>{this.state.email}</td>
                                </tr>
                            </tbody>
                        </table>
                        <hr/>
                        <button className="btn-edit" onClick={this.handleClick}>
                            <i id="icon-black" className="fa fa-edit"></i>Edit
                        </button>
                        </>
                        }
                        
                    </div>
                </div>
                <br/><br/>
            </div>
            </>
        )
    }
}

export default Profile

