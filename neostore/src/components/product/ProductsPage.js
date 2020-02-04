import React from 'react'
// import AllProduct from './AllProduct'
import Product from  './Product'
import ProductsFilter from './ProductsFilter'

function ProductsPage() {
    return (
        <div>
            <br/><hr/>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <ProductsFilter/>
                    </div>
                    <div className="col-md-9">
                        <Product/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsPage
