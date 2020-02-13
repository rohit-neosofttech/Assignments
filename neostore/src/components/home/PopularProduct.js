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
            alert('Invalid API call')
        })
    }

    render() {
        return (
            <div className="container">
                <h3 className="center">Popular Product</h3>
                <p className="center"><Link to="/productspage">View All</Link></p><br/>
                <div className="row">
                    { (this.state.product_details.length !==0) ? 
                    <>
                        {   
                            this.state.product_details.map(product =>
                            <ProductCard key={product._id} product={product}></ProductCard>
                        )}
                    </>
                    : <h1 className="center" style={{color:"#fb4646"}}><br/><em>No Popular Product found</em></h1>
                    }
                </div>
            </div>
        )
    }
}

export default PopularProduct
