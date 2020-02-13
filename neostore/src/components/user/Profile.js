import React from 'react'
import UserHome from './UserHome'


const custDetail = JSON.parse(localStorage.getItem("CustDetail"))

function Profile(props) {
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
                            <td>First Name :</td> <td>{custDetail.first_name}</td>
                        </tr>
                        <tr>
                            <td>Last Name :</td> <td>{custDetail.last_name}</td>
                        </tr>
                        <tr>
                            <td>Gender :</td> <td>{custDetail.gender}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth :</td> <td>{custDetail.dob}</td>
                        </tr>
                        <tr>
                            <td>Mobile Number :</td> <td>{custDetail.phone_no}</td>
                        </tr>
                        <tr>
                            <td>Email :</td> <td>{custDetail.email}</td>
                        </tr>
                    </table>
                    <hr/>
                    <button className="btn-edit" onClick={() => { const { history } = props; history.push(`/editProfile`); } }>
                        <i id="icon-black" className="fa fa-edit"></i>Edit
                    </button>
                </div>
            </div>
            <br/><br/>
        </div>
    )
}

export default Profile
