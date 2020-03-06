import React from 'react'
import { useHistory } from 'react-router-dom';
import * as api from '../../api'

function Carousel({carousel}) {
    const history = useHistory()

    const onClickHandler= () => {
        history.push(`/productsPage`,carousel);

    } 
    return (
        <div data-tip={carousel.product_name}>
            <img onClick={() => onClickHandler()} className="div-carousel" src={`${api.baseurl}/`+carousel.product_image} alt="Card Images" />
        </div>
    )
}

export default Carousel
