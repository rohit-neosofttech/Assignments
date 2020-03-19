import React, { PureComponent } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating'
import { Button, Modal } from 'react-bootstrap';
import * as api from '../../api'
import {addToCartCount} from '../redux'
import {connect} from 'react-redux'

import Loading from 'react-fullscreen-loading';
import SnackAlert from '../modules/SnackAlert'
import sweetalert from 'sweetalert'
import ImageGallery from 'react-image-gallery';

import {
    // Magnifier,
    SideBySideMagnifier,
    // MOUSE_ACTIVATION,
    // TOUCH_ACTIVATION,
    // MagnifierZoom,
    // MagnifierPreview,
    // MagnifierContainer
  } from "react-image-magnifiers";

  import {
    FacebookShareButton,
    PinterestShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    EmailIcon,
    FacebookIcon,
    PinterestIcon,
    TwitterIcon,
    WhatsappIcon,
  } from "react-share";

// import ReactImageMagnify from 'react-image-magnify';

class ProductDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            product:[],
            fullImage:'',
            show:false,
            newRating:0,
            open:false,
            message:'',
            type:'',
            loading:true
        }
        this.imageChangeHandler = this.imageChangeHandler.bind(this);
    }
    
    /**
     * Matches the component based on the params received in the productDetail url calls the commonPoducts API
     */
    componentDidMount() {
        const id =this.props.match.params.product_id
        axios.get(`${api.baseurl}/commonProducts?_id=${id}`)
            .then(res =>{
                this.setState({product:res.data.product_details[0],loading:false})
                this.setState({fullImage:`${api.baseurl}/`+ this.state.product.subImages_id.product_subImages[0]})
            })
            .catch((err)=> {
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'No Product Detail Found', "error",{button:false})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
                this.props.history.push("/productsPage")
            })
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.product_id!==prevProps.match.params.product_id) {
        const id =this.props.match.params.product_id
        axios.get(`${api.baseurl}/commonProducts?_id=${id}`)
            .then(res =>{
                this.setState({product:res.data.product_details[0],loading:false})
                this.setState({fullImage:`${api.baseurl}/`+ this.state.product.subImages_id.product_subImages[0]})
            })
            .catch((err)=> {
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'No Product Detail Found', "error",{button:false})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
                this.props.history.push("/productsPage")
            })
        }
    }
 
    /**
     * Select the thumbnail image as the Fullimage when clicked.
     * 
     * @param e  target event when the thumbnail image is clicked 
     */
    imageChangeHandler(e) {
        this.setState({fullImage:e.target.src})
    }

    /**
     * Add the product's detail to the cart with additional properties like quantity and total.
     * Also checks if the product if already present in the cart or not
     * 
     * @param product  contains the name of the product that is need to be added to the cart
     */
    addToCart = (product) => {
        let oldCart = JSON.parse(localStorage.getItem('cart')) 
        if (oldCart===null) {
            oldCart=[]
        }
        
        let newItem = product
        newItem['quantity'] = 1;
        newItem['total'] = product.quantity * product.product_cost

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

    /**
     * closes the Rating module
     */
    handleClose = () => {
        this.setState({show:false})
    }

    /**
     * Triggers the SnackBar Close event.
     * 
     * @param   event   contains the component that is been trigger from the event.
     * @param   reason  contains the string that is triggered when user clickes outside the sweetAlert model.
     */
    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open:false
        })
    };

    /**
     * Shows the Rating model when the user is logged-in 
     */
    handleShow = () => {
        if(!localStorage.getItem('userToken')) {
            sweetalert('',"Login Required",'warning',{button:false,timer:2000})
            localStorage.removeItem('custDetail')
        } 
        else {
            this.setState({ show:true })
        }
    }

    /**
     * Set the rating of the product in the state
     * 
     * @param   value   the rating that is been  provided by the user
     */
    handleRating = (value) => {
        this.setState({ newRating:value })
    }

    /**
     * Set the rating of the product when the user is logged-in and update the product rating using the updateProductRatingByCustomer API call.
     * 
     * @param   product_id   contains the product Id of the product whose rating is to be provided
     */
    handleSubmitRating = (product_id) => {
        if(this.state.newRating!==0) {
            let userToken = localStorage.getItem("userToken")
            axios.put(`${api.baseurl}/updateProductRatingByCustomer`,{
                product_id: product_id,
                product_rating: this.state.newRating
            }, {
                headers: {
                    Authorization: 'Bearer ' + userToken
                }
            })
            .then((res)=> {
                this.setState({
                    loader:false,
                    open:true,
                    message: res.data.message,
                    type: 'success',
                })
            })
            .catch((err)=> {
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'Something Went Wrong Providing Rating', "error",{button:false})
                } else if (err.request) {
                      sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                      sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            })
            this.setState({show:false})
        }
        else {
            this.setState({
                loader:false,
                open:true,
                message: 'Please provide a rating',
                type: 'info',
                title: 'Rating'
            })
        }
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

        const shareUrl = `http://localhost:3000${this.props.location.pathname}`
        
        // const fullImage = this.state.fullImage
        return (
            <>
            <Header/>
            {(this.state.loading)
            ?<div className="div-default"><Loading loading loaderColor="#3498db" /></div>
            :
            <div className="container" style={{paddingTop:"30px"}}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="">
                                {/* <SideBySideMagnifier 
                                    imageSrc={this.state.fullImage}
                                    overlayBoxImageSize="height:300px"
                                    zoomPosition="right"
                                /> */}
                                <img className="fullImage img-responsive" src={this.state.fullImage} alt="FullImage"/>
                            </div>
                        </div>
                        <div className="scrollmenu">
                            {product_subImage.map(subimage => (
                                    <img key={subimage} className="subImage" src={`${api.baseurl}/`+subimage} alt="SubImages" onClick={(subimage) =>this.imageChangeHandler(subimage)} />
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
                        <div className="row">
                            <FacebookShareButton url={shareUrl}><FacebookIcon size={50} round={true}/></FacebookShareButton>
                            <button className="share-btn" style={{backgroundColor: "#DB4437"}}><i className="fab fa-google"></i></button>
                            <WhatsappShareButton url={shareUrl}><WhatsappIcon size={50} round={true}/></WhatsappShareButton>
                            <PinterestShareButton url={shareUrl} media={this.state.fullImage}><PinterestIcon size={50} round={true}/></PinterestShareButton>
                            <TwitterShareButton url={shareUrl}><TwitterIcon size={50} round={true}/></TwitterShareButton>
                        </div>
                        <div className="row">
                            <button className="btn-add" style={{backgroundColor: "#00acee"}} onClick={()=>this.addToCart(product)}>Add to Cart</button>
                            <button className="btn-add" style={{backgroundColor: "#754b10"}} onClick={()=>this.handleShow(product)}>Rate Product</button>
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
                {this.state.open && <SnackAlert open={this.state.open} message={this.state.message} 
                    type={this.state.type} handleClose={this.handleSnackClose}/>}

                <Modal show={this.state.show} onHide={()=>this.handleClose()}>
                    <Modal.Header>
                    <Modal.Title className="center">Rate Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="center">
                        <Rating name="simple-controlled " size="large" precision={0.5} value={this.state.newRating} onChange={(e,value) => this.handleRating(value)} />
                    </Modal.Body>
                    <Modal.Footer className="center">
                    <Button variant="primary" onClick={()=>this.handleSubmitRating(product.product_id)}>
                        Done
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
            }
            </>
        )
    }
}

// export default ProductDetail
const mapDispatchToProps = dispatch => {
    return {
        addToCartCount: () => dispatch(addToCartCount())
    }
  }
  
  export default connect(null, mapDispatchToProps)(ProductDetail)
