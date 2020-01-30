import React, { PureComponent } from 'react'
import axios from 'axios'
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
            console.log(err)
        })

        //Axios for Gurantee and Return Policy on the footer
        axios.get(`http://180.149.241.208:3022/getGuarantee`)
        .then((res)=>{     
            this.setState({policy:res.data.guarantee_details[0]})     
        })
        .catch((err)=> {
            console.log(err)
        })
    }
    render() {
        let baseurl="http://180.149.241.208:3022/"
        // console.log(`${baseurl}${this.state.terms.fileName}`)
        return (
            <>
                <h5>Information</h5>    
                <a style={{color: "white"}} href={`${baseurl}${this.state.terms.fileName}`} target="_blank">Terms And Conditions</a><br/>
                <a style={{color: "white"}} href={`${baseurl}${this.state.policy.fileName}`} target="_blank">Gurantee and Return Policy</a><br/>
                <Link to='/contact' style={{color: "white"}}>Contact Us</Link><br/>
                Privacy Policy<br/>
                <Link to='/location' style={{color: "white"}}>Locate Us</Link><br/>
            </>
        )
    }
}

export default Information
