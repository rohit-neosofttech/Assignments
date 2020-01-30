import React, { PureComponent } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { Link } from 'react-router-dom';

class PopularProduct extends PureComponent {
    constructor() {
        super();
        this.state={
            product_details:[]
        }
    }

    componentDidMount(){
        axios.get(`http://180.149.241.208:3022/defaultTopRatingProduct`)
        .then((res)=>{
            this.setState({product_details:res.data.product_details})
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    render() {
        const {product_details}=this.state
        const product_list=product_details.map(product =><ProductCard key={product_details.id} product={product}></ProductCard>)
        return (
            <div className="container">
                <h3 className="center">Popular Product</h3>
                <p className="center"><Link to="/productspage">View All</Link></p>
                <div className="row">
                    {product_list}
                </div>
            </div>
        )
    }
}

export default PopularProduct
