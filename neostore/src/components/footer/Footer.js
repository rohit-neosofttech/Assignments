import React, { PureComponent } from 'react'
import AboutCompany from './AboutCompany'
import Information from './Information'
import NewsLetter from './Newsletter'

import './Footer.css'

export class Footer extends PureComponent {
    render() {
        return (
            <div className="footer container-fluid center text-align-center">
                <div className="row">
                    <div className="col-md-4">
                        <AboutCompany/>
                    </div>
                    <div className="col-md-4">
                        <Information/>
                    </div>
                    <div className="col-md-4">
                        <NewsLetter/>
                    </div>
                </div>
                <p>Copyright 2017 NeoSOFT Technologies All rights reserved | Design By ...</p>
            </div>
        )
    }
}

export default Footer