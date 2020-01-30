import React, { Component } from 'react'
import axios from 'axios';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:[]
        }
    }
    
    componentDidMount() {
        const id =this.props.match.params.product_id
        axios.get(`http://180.149.241.208:3022/getAllProducts`)
            .then(res =>{
                // console.log(res.data.product_details)
                this.setState({products:res.data.product_details})

                const productId = this.state.products.filter(product => product.product_id=== id);
                // console.log(productId);
                this.setState({product:productId})
                console.log(this.state.product[0]);
            })
            .catch((err)=> {
                console.log(err)
            })
    }
    render() {
        const {product}=this.state
        // console.log(product)
        return (
            <div className="container pad">
                <div className="row">
                    <div className="col-md-6">

                    </div>
                    <div className="col-md-6">
                        <h2>product Name</h2>
                        <h6>{this.state.id}</h6>
                        rating<br/>
                        <hr/>
                        Price<br/>
                        Share<i id='icon-black' class="fas fa-share-alt "></i><br/>
                        <div className='row'>
                            <button className="share-btn" style={{backgroundColor: "#4267B2"}}><i class="fab fa-facebook-f"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#DB4437"}}><i class="fab fa-google"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#25D366"}}><i class="fab fa-whatsapp"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#BD091D"}}><i class="fab fa-pinterest-p"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#00acee"}}><i class="fab fa-twitter"></i></button>
                        </div>
                        <div className="row">
                            <button className="btn-add" style={{backgroundColor: "#00acee"}}>Add to Cart</button>
                            <button className="btn-add" style={{backgroundColor: "#754b10"}}>Rate Product</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <nav className="tab-nav-full">
                        <div className="nav" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-description" role="tab" aria-controls="nav-description" aria-selected="true">Description</a>
                            <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-features" role="tab" aria-controls="nav-features" aria-selected="false">Features</a>
                        </div>
                    </nav>
                    
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" style={{height:'200px'}}>
                            Since sofas are manufactured against your order, we require you to pay an advance of 25% of the total amount. We will collect the balance (through the card on delivery option) when we deliver the product. However, if you want to pay in full (to avail of credit card EMI, for instance), please call us at 080-67400200 (Monday-Saturday, 10AM-8PM) and we can help you out.
                        </div>
                        <div className="tab-pane" id="nav-features" role="tabpanel" aria-labelledby="nav-features-tab" style={{height:'200px'}}>
                            Since you to pa
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail
