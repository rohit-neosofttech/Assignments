
import React, { PureComponent } from 'react'
import UserHome from './UserHome'
import User from '../../defaultUser.png'
import * as api from '../../api'
import axios from 'axios'

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
            profile_img:''
        }
    }
    
    componentDidMount() {
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
                gender : profile.gender
            })
            localStorage.setItem('CustDetail',JSON.stringify(res.data.customer_proile) )
        })
        .catch(err => {
            console.log(err)
            alert("invalid api call")
        });
    }

    handleClick = (e) => {
        this.props.history.push('/editProfile',this.state);
    }

    render() {
        return (
            <div className="container p-3">
                <h3>My Account</h3>
                <hr/>
                <div className="row">
                    <UserHome />
                    <div className="col-md-8 card p-3" >
                        <h2>Profile</h2>
                        <hr/><br/>
                        <table>
                            <tr>
                                <td>First Name :</td> <td>{this.state.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name :</td> <td>{this.state.lastName}</td>
                            </tr>
                            <tr>
                                <td>Gender :</td> <td>{this.state.gender}</td>
                            </tr>
                            <tr>
                                <td>Date of Birth :</td> <td>{this.state.dob}</td>
                            </tr>
                            <tr>
                                <td>Mobile Number :</td> <td>{this.state.mobile}</td>
                            </tr>
                            <tr>
                                <td>Email :</td> <td>{this.state.email}</td>
                            </tr>
                        </table>
                        <hr/>
                        <button className="btn-edit" onClick={this.handleClick}>
                            <i id="icon-black" className="fa fa-edit"></i>Edit
                        </button>
                    </div>
                </div>
                <br/><br/>
            </div>
        )
    }
}

export default Profile

