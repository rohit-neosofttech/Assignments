import React, { Component } from 'react'
import axios from 'axios'

export class AboutCompany extends Component {
    constructor() {
        super();
        this.state = {
            company_details:[]
        }
    }
    
    componentDidMount(){
        // console.log("component Mount")
        axios.get(`http://180.149.241.208:3022/getData`)
        .then((res)=>{
            this.setState({company_details:res.data.company_details[0]})            
            // console.log(res.data.company_details[0])
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    render() {
        const {company_details} =this.state
        return (
            <>
                <h5>About Company</h5>  
                <p>{company_details.about_company}</p>
                <p>
                    <strong>Contact Information<br/></strong>
                    {company_details.email}<br/>
                    {company_details.phone_no}<br/>
                    {company_details.address}
                </p>
            </>
        )
    }
}

export default AboutCompany
