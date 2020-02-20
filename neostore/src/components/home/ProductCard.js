import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import * as api from '../../api'

function ProductCard({product}) {
    const product_id = product.DashboardProducts[0].product_id
    const product_image = product.DashboardProducts[0].product_image
    const product_name = product.DashboardProducts[0].product_name
    const product_cost = product.DashboardProducts[0].product_cost
    const product_rating = Number(product.DashboardProducts[0].product_rating)

    
    const addToCart = (product) => {
        let oldCart = JSON.parse(localStorage.getItem('cart')) 
        if (oldCart===null) {
            oldCart=[]
        }
        
        let newItem = product.DashboardProducts[0]
        newItem['quantity'] = 1;
        newItem['total'] = product.DashboardProducts[0].quantity * product.DashboardProducts[0].product_cost

        let item=oldCart.filter(item => item.product_id===newItem.product_id)
        if(item.length===0) {
            oldCart.push(newItem);
            localStorage.setItem('cart',JSON.stringify(oldCart))
            alert("Product Added to Cart")
        }
        else{
            alert("Product already in present in cart")
        }
    }
    
    return (
        <div className="col-md-3" >
            <div className={'cards'}>
                <img className={'cardimage'} src={`${api.baseurl}/${product_image}`} alt="Card Images"/>
                <label><Link to={'/productdetail/' + product_id} style={{color:"#3368bb"}}>{product_name}</Link></label>
                <div className="bottomCenter">
                    <label><strong>Rs. {product_cost}</strong></label><br/>
                    <button className="btn-add" onClick={()=>addToCart(product)}>Add to Cart</button><br/>
                    <Rating name="rating" precision={0.1} value={product_rating} disabled />
                </div>
            </div>
        </div>
    )
}

export default ProductCard