import React from 'react'
import PopularProduct from './PopularProduct'
import TopCarousel from './TopCarousel'

function Home() {
    return (
        <div>
            <div className="pad">
                <TopCarousel/>  
            </div>
            <hr/>
            <div className="pad">
                <PopularProduct/>
            </div>
        </div>
    )
}

export default Home
