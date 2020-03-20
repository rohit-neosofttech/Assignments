import React, { PureComponent } from 'react'
import axios from 'axios'
import * as api from '../../api'
import sweetalert from 'sweetalert'
import { Link } from 'react-router-dom';

class Information extends PureComponent {
    constructor() {
        super();
        this.state = {
            terms:[],
            policy:[]
        }
    }

    /**
     * API call to get the Terms & Conditions and Gurantee & Return Policy on the footer
     */
    componentDidMount() {
        axios.get(`${api.baseurl}/getTermsAndConditions`)
        .then((res)=>{     
            this.setState({terms:res.data.termsAndConditions_details[0]})     
        })
        .catch((err)=> {
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong Getting Terms And Conditions', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err}`, "error",{button:false})
            }
        })

        //Axios for Gurantee and Return Policy on the footer
        axios.get(`${api.baseurl}/getGuarantee`)
        .then((res)=>{     
            this.setState({policy:res.data.guarantee_details[0]})     
        })
        .catch((err)=> {
            if (err.response) {
                err.response.data.message 
                ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                : sweetalert("Oops!", 'Something Went Wrong getting Guarantee', "error",{button:false})
            } else if (err.request) {
                  sweetalert("Oops!", `${err.request}`, "error",{button:false})
            } else {
                  sweetalert("Oops!", `${err}`, "error",{button:false})
            }
        })
    }
    render() {
        return (
            <>
                <h5 style={{padding: '15px'}}>Information</h5>  
                {(this.state.terms.length!==0 && this.state.policy.length!==0) 
                ? 
                <>  
                    <a style={{color: "white"}} rel="noopener noreferrer" href={`${api.baseurl}/${this.state.terms.fileName}`} target="_blank">Terms And Conditions</a><br/>
                    <a style={{color: "white"}} rel="noopener noreferrer" href={`${api.baseurl}/${this.state.policy.fileName}`} target="_blank">Gurantee and Return Policy</a><br/>
                </> 
                : <p>No detail Found</p>
                }
                <Link to='/contact' style={{color: "white"}}>Contact Us</Link><br/>
                Privacy Policy<br/>
                <Link to='/location' style={{color: "white"}}>Locate Us</Link><br/>
            </>
        )
    }
}

export default Information
