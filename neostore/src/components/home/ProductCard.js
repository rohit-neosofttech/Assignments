import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import * as api from '../../api'
import {addToCartCount} from '../redux'
import {connect} from 'react-redux'

import SnackAlert from '../modules/SnackAlert'
class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state={
            type:'',
            message:"",
            open:false
        }
    }
    
    addToCart = (product) => {
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
            this.setState({
                type:'success',
                message:"Product Added to Cart",
                open:true
            })
            this.props.addToCartCount()
        }
        else{
            this.setState({
                type:'warning',
                message:"Product already in present in cart",
                open:true
            })
        }
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({open:false})
        
    };

    render() {
        const product_id = this.props.product.DashboardProducts[0].product_id
        const product_image = this.props.product.DashboardProducts[0].product_image
        const product_name = this.props.product.DashboardProducts[0].product_name
        const product_cost = this.props.product.DashboardProducts[0].product_cost
        const product_rating = Number(this.props.product.DashboardProducts[0].product_rating)
        return (
            <div className="col-md-3" >
                <div className={'cards'}>
                    <img className={'cardimage'} src={`${api.baseurl}/${product_image}`} alt="Card Images"/>
                    <label><Link to={'/productdetail/' + product_id} style={{color:"#3368bb"}}>{product_name}</Link></label>
                    <div className="bottomCenter">
                        <label><strong>Rs. {product_cost}</strong></label><br/>
                        <button className="btn-add" onClick={()=>this.addToCart(this.props.product)}>Add to Cart</button><br/>
                        <Rating name="rating" precision={0.1} value={product_rating} disabled />
                    </div>
                </div>
                {this.state.open && <SnackAlert open={this.state.open} message={this.state.message} type={this.state.type} handleClose={this.handleClose}/>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCartCount: () => dispatch(addToCartCount())
    }
}

export default connect(null, mapDispatchToProps)(ProductCard)
