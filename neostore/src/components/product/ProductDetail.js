import React, { PureComponent } from 'react'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating'

class ProductDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allproduct:[],
            product:[],
            color:[]
        }
    }
    
    componentDidMount() {
        const id =this.props.match.params.product_id
        axios.get(`http://180.149.241.208:3022/getAllProducts`)
            .then(res =>{
                // console.log(res.data.product_details)
                this.setState({allproduct:res.data.product_details})

                const product = this.state.allproduct.filter(product => product.product_id=== id);
                // console.log(productId);
                this.setState({product:product[0]})
                // console.log(this.state.product);
            })
            .catch((err)=> {
                console.log(err)
            })
    }

    render() {
        const {product}=this.state
        const product_name = product.product_name
        const product_rating = Number(product.product_rating)
        const product_cost = product.product_cost

        // console.log(product.color_id)
        const product_color = product.color_id
        // this.setState.color = product_color.map(color => <div key={color.color_id}>{color.color_name}</div>)
        console.log(product_color)
        
        const product_desc = product.product_desc
        
        const product_dimension = product.product_dimension
        const product_material = product.product_material
        const product_producer = product.product_producer

        return (
            <div className="container pad">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="">
                                Image
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                Image 1
                            </div>
                            <div className="col">
                                Image 2
                            </div>
                            <div className="col">
                                Image 3
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>{product_name}</h2>
                        <Rating name="rating" precision={0.1} value={product_rating} disabled />
                        <hr/>
                        Price : &#8377; <span style={{color:"green"}}>{product_cost}</span><br/>
                        Color : <span>{}</span><br/>
                        Share<i id='icon-black' className="fas fa-share-alt "></i><br/>
                        <div className='row'>
                            <button className="share-btn" style={{backgroundColor: "#4267B2"}}><i className="fab fa-facebook-f"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#DB4437"}}><i className="fab fa-google"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#25D366"}}><i className="fab fa-whatsapp"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#BD091D"}}><i className="fab fa-pinterest-p"></i></button>
                            <button className="share-btn" style={{backgroundColor: "#00acee"}}><i className="fab fa-twitter"></i></button>
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
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-features" role="tab" aria-controls="nav-features" aria-selected="false">Features</a>
                        </div>
                    </nav>
                    
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane show active" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab" style={{height:'200px'}}>
                            {product_desc}
                        </div>
                        <div className="tab-pane" id="nav-features" role="tabpanel" aria-labelledby="nav-features-tab" style={{height:'200px'}}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td><em>Dimension : </em></td>
                                        <td>{product_dimension}</td>
                                    </tr>
                                    <tr>
                                        <td><em>Material : </em></td>
                                        <td>{product_material}</td>
                                    </tr>
                                    <tr>
                                        <td><em>Manufacturer : </em></td>
                                        <td>{product_producer}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail
