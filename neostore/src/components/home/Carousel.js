import React from 'react'

const baseurl = "http://180.149.241.208:3022/"
function Carousel({carousel}) {
    return (
        <div>
            <img className="div-carousel" src={`${baseurl}`+carousel.product_image} alt="Card Images"/>
        </div>
    )
}

export default Carousel
