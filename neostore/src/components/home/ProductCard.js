import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

const baseurl = "http://180.149.241.208:3022/"
function ProductCard({product}) {
    return (
        <div className="col-md-3">
            <div className={'cards'}>
                <img className={'cardimage'} src={`${baseurl}`+product.DashboardProducts[0].product_image} alt="Card Images"/>
                <label><Link to='' style={{color:"#3368bb"}}>{product.DashboardProducts[0].product_name}</Link></label>
                <div className="bottomCenter">
                    <label><strong>Rs. {product.DashboardProducts[0].product_cost}</strong></label><br/>
                    <button className="btn-add">Add to Cart</button><br/>
                    <Rating name="" precision="0.5" value={product.DashboardProducts[0].product_rating} disabled />
                </div>
            </div>
        </div>
    )
}

export default ProductCard