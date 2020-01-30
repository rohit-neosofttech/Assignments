import React, { Component } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'

class AllProduct extends Component {
    constructor() {
        super();
        this.state={
            products:[]
        }
    }

    componentDidMount(){
        axios.get(`http://180.149.241.208:3022/commonProducts`)
        .then((res)=>{
            console.log(res.data.product_details)
            this.setState({products:res.data.product_details})
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    render() {
        const {products}=this.state
        const products_list=products.map(product =><ProductCard key={products.id} product={product}></ProductCard>)
        
        return (
            <div className="container">
                <h3 className="center">All Categories</h3>
                <div className="container">
                    <div className="row">
                        {products_list}
                    </div>
                </div>
            </div>
        )
    }
}

export default AllProduct
