import React, { Component } from 'react'
import PopularProduct from './PopularProduct'
import TopCarousel from './TopCarousel'
import Header from '../header/Header'

class Home extends Component {
    render() {
        return (
            <>
            <Header/>
            <div className="container-fullwidth" style={{minHeight:"600px"}}>
                <br/><br/>
                <div style={{minHeight:"200px"}}>
                    <TopCarousel/>  
                </div>
                <br/><hr/><br/>
                <div className="container">
                    <PopularProduct/>
                </div>
                <br/>
            </div>
            </>
        )
    }
}

export default Home

