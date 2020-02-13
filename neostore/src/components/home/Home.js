import React from 'react'
import PopularProduct from './PopularProduct'
import TopCarousel from './TopCarousel'

function Home() {
    return (
        <div>
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
    )
}

export default Home
