import React, { PureComponent } from 'react'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating'


const baseurl = "http://180.149.241.208:3022/"
class ProductDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            allproduct:[],
            product:[],
            fullImage:''
        }
        this.imageChangeHandler = this.imageChangeHandler.bind(this);
    }
    
    componentDidMount() {
        const id =this.props.match.params.product_id
        axios.get(`${baseurl}getAllProducts`)
            .then(res =>{
                this.setState({allproduct:res.data.product_details})
                const product = this.state.allproduct.filter(product => product.product_id === id);
                this.setState({product:product[0]})
                this.setState({fullImage:`${baseurl}`+ this.state.product.subImages_id.product_subImages[0]})
            })
            .catch((err)=> {
                console.log(err)
            })
    }
 
    imageChangeHandler(e) {
        this.setState({fullImage:e.target.src})
      }

    render() {
        const {product}=this.state
        const product_name = product.product_name
        const product_rating = Number(product.product_rating)
        const product_cost = product.product_cost

        let color_code = ''
        if (this.state.product.color_id !== undefined){
            color_code= this.state.product.color_id.color_code
        }
        
        let product_subImage=[]
        if (this.state.product.subImages_id !== undefined){
            product_subImage=this.state.product.subImages_id.product_subImages
        }

        const product_desc = product.product_desc
        
        const product_dimension = product.product_dimension
        const product_material = product.product_material
        const product_producer = product.product_producer

        return (
            <div className="container pad">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="fullImage">
                                <img className="fullImage img-responsive" src={this.state.fullImage} alt="FullImage"/>
                            </div>
                        </div>
                        <div className="row">
                            {product_subImage.map(subimage => (
                                <div key={subimage} className='col'>
                                    <img className="subImage" src={`${baseurl}`+subimage} alt="SubImages" onClick={(subimage) =>this.imageChangeHandler(subimage)} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>{product_name}</h2>
                        <Rating name="rating" precision={0.1} value={product_rating} disabled />
                        <hr/>
                        Price : &#8377; <span style={{color:"green"}}>{product_cost}</span><br/>
                        Color : <div className="color-pallet-inline" style={{backgroundColor:`${color_code}`}} /><br/>
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
