import React, { Component } from 'react'
import * as api from '../../api'
import axios from 'axios'

export class AboutCompany extends Component {
    constructor() {
        super();
        this.state = {
            company_details:[]
        }
    }
    
    componentDidMount(){
        // console.log(api.baseurl)
        axios.get(`${api.baseurl}/getData`)
        .then((res)=>{
            this.setState({company_details:res.data.company_details[0]})   
        })
        .catch((err)=> {
            alert("Wrong API call")
        })
    }

    render() {
        const {company_details} =this.state
        return (
            <>
                <h5>About Company</h5>  
                {
                    (company_details.length === 0) ? <p>No detail Found</p> : 
                    <>
                        <p>{company_details.about_company}</p>
                        <p>
                            <strong>Contact Information<br/></strong>
                            {company_details.email}<br/>
                            {company_details.phone_no}<br/>
                            {company_details.address}
                        </p>
                    </>
                }
            </>
        )
    }
}

export default AboutCompany
