import React, { PureComponent } from 'react'
import axios from 'axios'
import * as api from '../../api'

import { Link } from 'react-router-dom';

export class Information extends PureComponent {
    constructor() {
        super();
        this.state = {
            terms:[],
            policy:[]
        }
    }

    componentDidMount() {
        //Axios for terms & condition on the footer
        axios.get(`http://180.149.241.208:3022/getTermsAndConditions`)
        .then((res)=>{     
            this.setState({terms:res.data.termsAndConditions_details[0]})     
        })
        .catch((err)=> {
            alert("Wrong API call")
        })

        //Axios for Gurantee and Return Policy on the footer
        axios.get(`http://180.149.241.208:3022/getGuarantee`)
        .then((res)=>{     
            this.setState({policy:res.data.guarantee_details[0]})     
        })
        .catch((err)=> {
            alert("Wrong API call")
        })
    }
    render() {
        return (
            <>
                <h5>Information</h5>  
                {(this.state.terms.length!==0 && this.state.policy.length!==0) 
                ? 
                <>  
                    <a style={{color: "white"}} rel="noopener noreferrer" href={`${api.baseurl}${this.state.terms.fileName}`} target="_blank">Terms And Conditions</a><br/>
                    <a style={{color: "white"}} rel="noopener noreferrer" href={`${api.baseurl}${this.state.policy.fileName}`} target="_blank">Gurantee and Return Policy</a><br/>
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
