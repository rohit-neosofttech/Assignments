import React, {Component} from 'react'
import UserHome from './UserHome'
import axios from 'axios'
import * as api from '../../api'

export class Order extends Component {

    componentDidMount() {
        axios.get(`${api.baseurl}/getCustomerOrder`)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=> {
            alert("Invalid componentDidMount API call")      
        })
    }

    render() {
        return (
            <div className="container">
            <h1>My Account</h1>
            <hr/>
            <div className="row">
                <UserHome />
                <div className="col-md-7 card profile-cards p-3">
                    My Order
                </div>
            </div>
        </div>
        )
    }
}

export default Order

