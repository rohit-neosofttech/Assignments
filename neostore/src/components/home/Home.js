import React, { Component } from 'react'
import PopularProduct from './PopularProduct'
import TopCarousel from './TopCarousel'
import Header from '../header/Header'

class Home extends Component {
    render() {
        return (
            <>
            <Header/>
            <div className="container-fullwidth">
                <br/><br/>
                <div>
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

