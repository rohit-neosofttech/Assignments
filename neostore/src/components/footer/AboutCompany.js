import React, { PureComponent } from 'react'
import * as api from '../../api'
import axios from 'axios'
import sweetalert from 'sweetalert'

class AboutCompany extends PureComponent {
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
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong getting Company Data', "error",{button:false})
          
                // alert(error.response.data.message)
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err.message}`, "error",{button:false})
            }
        })
    }

    render() {
        const {company_details} =this.state
        return (
            <>
                <h5 style={{padding: '15px'}}>About Company</h5>  
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
