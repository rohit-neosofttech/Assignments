import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'

const baseurl = "http://180.149.241.208:3022/"
function ProductCard({product}) {
    const product_id = product.DashboardProducts[0].product_id
    const product_image = `${baseurl}`+ product.DashboardProducts[0].product_image
    const product_name = product.DashboardProducts[0].product_name
    const product_cost = product.DashboardProducts[0].product_cost
    const product_rating = Number(product.DashboardProducts[0].product_rating)

    return (
        <div className="col-md-3">
            <div className={'cards'}>
                <img className={'cardimage'} src={product_image} alt="Card Images"/>
                <label><Link to={'/productdetail/' + product_id} style={{color:"#3368bb"}}>{product_name}</Link></label>
                <div className="bottomCenter">
                    <label><strong>Rs. {product_cost}</strong></label><br/>
                    <button className="btn-add">Add to Cart</button><br/>
                    <Rating name="rating" precision={0.1} value={product_rating} disabled />
                </div>
            </div>
        </div>
    )
}

export default ProductCard