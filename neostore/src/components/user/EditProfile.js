import React, { Component } from 'react'
import Header from '../header/Header'
import UserHome from './UserHome'
import InputFloat from 'react-floating-input'
import User from '../../defaultUser.png'
import axios from 'axios'
import * as api from '../../api'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const custDetail = JSON.parse(localStorage.getItem("CustDetail"))
const userToken = localStorage.getItem('userToken')

class EditProfile extends Component {
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
            console.log(profile)
            this.setState({
                firstName:profile.first_name,
                lastName:profile.last_name,
                email:profile.email,
                mobile:profile.phone_no,
                gender:profile.gender,
                dob:profile.dob,
                profile_img:profile.profile_img
            })
        })
        .catch(err => {
            console.log(err)
            alert("invalid api call")
        });
    }

    handleChange = (e) => {
        // e.preventDefault();
        const { name, value } = e.target;
        this.setState({[name]: value }, () => console.log(this.state));
    };

    onDateChange = e => {
        // this.setState({ profile_img: e.target.files })
        // console.log(e.target.files)
        // this.setState({ profile_img: e.target.files }, () => console.log(this.state));
    }

    onImageChange = e => {
        // this.setState({ profile_img: e.target.files })
        console.log(e.target.files)
        this.setState({ profile_img: e.target.files }, () => console.log(this.state));
    }

    handleProfileUpdate = () => {

        // let img = (this.state.profile_img[0]) ? this.state.profile_img[0] : ''
        // let img_name = (this.state.profile_img[0].name) ? this.state.profile_img[0].name : ''

        // console.log("profileImage: ",this.state.profile_img)
        let formData = new FormData()
        if(this.state.profile_img==='') {
            formData.append('profile_img',null,null)
        } else {
            formData.append('profile_img',this.state.profile_img[0],this.state.profile_img[0].name)
        }
        formData.append('first_name',this.state.firstName)
        formData.append('last_name',this.state.lastName)
        formData.append('email',this.state.email)
        formData.append('dob',this.state.dob)
        formData.append('phone_no',this.state.mobile)
        formData.append('gender',this.state.gender)

        // formData = {
        //     profile_img : this.state.profile_img[0],
        //     first_name : this.state.firstName,
        //     last_name : this.state.lastName,
        //     email : this.state.email,
        //     dob : this.state.dob,
        //     phone_no : this.state.mobile,
        //     gender : this.state.gender
        // }
        console.log("formdata: ",formData)

        axios.put(`${api.baseurl}/profile`, formData , {
            headers: {
              Authorization: 'Bearer ' + userToken
            }}
        )
        .then(res => {
            alert("Form submitted");
        })
        .catch(err => {
            alert('Edit Profile Error')
        });
        this.props.history.push("/profile")
    };

    render() {
        return (
            <>
            <Header/>
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
                                        name="firstName" 
                                        /><br/>

                            <InputFloat style={{fontSize:'24px'}}
                                        value={this.state.lastName}
                                        onChange={this.handleChange}
                                        placeholder="Last Name" 
                                        name="lastName" /><br/>
                            
                            <input type="radio" name="gender" value="male" checked/> Male <span>&emsp;</span>
                            <input type="radio" name="gender" value="female"/> Female<br/><br/>

                            <input class="form-control" type="date" value={this.state.dob} onChange={this.onDateChange} 
                            id="example-date-input"/><br/>

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

                            <input type="file" onChange={this.onImageChange}/><br/>
                            <hr/>
                            <button className="btn-edit" type="submit"><i id='icon-black' className="fa fa-save"></i>Save</button>&emsp;&emsp;
                            <button className="btn-edit" onClick={()=>this.props.history.push("/profile")}><i id='icon-black' className="fa fa-times"></i>Cancel</button>
                        </form>
                    </div>
                </div><br/><br/><br/>
            </div>
        </>
        )
    }
}

export default EditProfile
