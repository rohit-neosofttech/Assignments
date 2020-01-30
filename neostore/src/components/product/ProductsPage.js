import React, { Component } from 'react'
import AllProduct from './AllProduct'

class ProductsPage extends Component {
    render() {
        return (
            <div>
                <h1>Products Page:</h1>
                <h4>All product, Color Filters, catergories</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            Filters
                        </div>
                        <div className="col-md-9">
                            <AllProduct/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsPage
