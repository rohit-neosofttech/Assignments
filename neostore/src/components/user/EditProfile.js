import React, { Component } from 'react'
import UserHome from './UserHome'
import InputFloat from 'react-floating-input'
import axios from 'axios'
import * as api from '../../api'

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state ={
            firstName: custDetail.first_name,
            lastName: custDetail.last_name,
            email: custDetail.email,
            mobile:custDetail.phone_no,
            gender:custDetail.gender,
            dob:custDetail.dob,
            profile_img:custDetail.profile_img
        }
    }
    
    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }, () => console.log(this.state));
      };

    handleProfileUpdate = e => {
        axios.put(`${api.baseurl}/updateAllCustomer`, {
            profile_img : this.state.profile_img,
            first_name : this.state.firstName,
            last_name : this.state.lastName,
            email : this.state.email,
            dob : this.state.dob,
            phone_no : this.state.mobile,
            gender : this.state.gender
        })
        .then(res => {
            const { history } = this.props;
            history.push(`/`);
        })
        .catch(e => alert('Edit Profile Error'));
        // alert("Form submitted succesfully");
      };

    render() {
        return (
            <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="col-md-7 card p-3">
                    <h2>Edit Profile</h2>
                    <hr/><br/>
                    <form onSubmit={this.handleProfileUpdate}>
                        <InputFloat style={{fontSize:'24px'}}
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    placeholder="First Name" 
                                    name="firstName" /><br/>

                        <InputFloat style={{fontSize:'24px'}}
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    placeholder="Last Name" 
                                    name="lastName" /><br/>

                        <input type="radio" name="gender" value="male" checked/> Male <span>&emsp;</span>
                        <input type="radio" name="gender" value="female"/> Female<br/><br/>

                        <input class="form-control" type="date" value={this.state.dob} id="example-date-input"></input><br/>

                        <InputFloat style={{fontSize:'24px'}}
                                    value={this.state.mobile}
                                    onChange={this.handleChange}
                                    placeholder="Mobile" 
                                    name="mobile" /><br/>

                        <InputFloat style={{fontSize:'24px'}}
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    placeholder="Email Address" 
                                    name="email" /><br/>

                        <input type="file"></input><br/>
                        <hr/>
                        <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                        <button className="btn-edit"><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                    </form>
                </div>
            </div><br/><br/><br/>
        </div>
        )
    }
}

export default EditProfile
