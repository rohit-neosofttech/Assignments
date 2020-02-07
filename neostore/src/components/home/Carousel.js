import React from 'react'
import { useHistory } from 'react-router-dom';

const baseurl = "http://180.149.241.208:3022/"
function Carousel({carousel}) {
    const history = useHistory()

    const onClickHandler= () => {
        history.push(`productsPage/${carousel.category_id}`);
    } 
    return (
        <div>
            <img onClick={() => onClickHandler()} className="div-carousel" src={`${baseurl}`+carousel.product_image} alt="Card Images"/>
        </div>
    )
}

export default Carousel
