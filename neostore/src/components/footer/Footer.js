import React from 'react'
import AboutCompany from './AboutCompany'
import Information from './Information'
import NewsLetter from './Newsletter'

function Footer() {
    return (
        <div className="footer container-fluid center text-align-center">
            <div className="row">
                <div className="col-sm-4" style={{padding:"0px 50px"}}>
                    <AboutCompany/>
                </div>
                <div className="col-sm-4" style={{padding:"0px 50px"}}>
                    <Information/>
                </div>
                <div className="col-sm-4" style={{padding:"0px 50px"}}>
                    <NewsLetter/>
                </div>
            </div>
            <p >Copyright 2017 NeoSOFT Technologies All rights reserved | Design By ...</p>
        </div>
    )
}

export default Footer

