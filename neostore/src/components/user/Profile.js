
import React, { PureComponent } from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import * as api from '../../api'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import sweetalert from 'sweetalert'

const userToken = localStorage.getItem('userToken')

export class Profile extends PureComponent {
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
        axios.get(`${api.baseurl}/getCustProfile`, {
            headers: {
              Authorization: 'Bearer ' + userToken
            }}
        )
        .then(res => {
            const profile = res.data.customer_proile
            
            this.setState({
                profile_img : profile.profile_img,
                firstName : profile.first_name,
                lastName : profile.last_name,
                email : profile.email,
                dob : profile.dob,
                mobile : profile.phone_no,
                gender : profile.gender,
                loader:false
            })
        })
        .catch(err => {
            this.setState({loader:false})
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong getting Profile', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
        });
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
                        }
                        <hr/>
                        <button className="btn-edit" onClick={this.handleClick}>
                            <i id="icon-black" className="fa fa-edit"></i>Edit
                        </button>
                    </div>
                </div>
                <br/><br/>
            </div>
            </>
        )
    }
}

export default Profile

