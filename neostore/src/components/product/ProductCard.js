import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

const baseurl = "http://180.149.241.208:3022/"

function ProductCard({product}) {
    const product_id = product.product_id
    const product_image = `${baseurl}`+ product.product_image
    const product_name = product.product_name
    const product_cost = product.product_cost
    const product_rating = Number(product.product_rating)

    return (
        <div className="col-md-4">
            <div className={'cards'}>
                <img className={'cardimage'} src={`${baseurl}`+product_image} alt="Card Images"/>
                <label><Link to={'/productdetail'+ product_id} style={{color:"#3368bb"}}>{product_name}</Link></label>
                <div className="justify-content-center">
                    <label><strong>&#8377; {product_cost}</strong></label><br/>
                    <button className="btn-add">Add to Cart</button><br/>
                    <Rating name="" precision="0.5" value={product_rating} disabled />
                </div>
            </div>
        </div>
    )
}

export default ProductCard