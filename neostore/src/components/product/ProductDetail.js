import React, { PureComponent } from 'react'
import Header from '../header/Header'
import axios from 'axios';
import Rating from '@material-ui/lab/Rating'
import { Button, Modal } from 'react-bootstrap';
import * as api from '../../api'

import Loading from 'react-fullscreen-loading';
import SnackAlert from '../SnackAlert'
import sweetalert from 'sweetalert'

import {
    Magnifier,
    SideBySideMagnifier,
    MOUSE_ACTIVATION,
    TOUCH_ACTIVATION,
    MagnifierZoom,
    MagnifierPreview,
    MagnifierContainer
  } from "react-image-magnifiers";

const userToken = localStorage.getItem("userToken")

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
    
    componentDidMount() {
        const id =this.props.match.params.product_id
        axios.get(`${api.baseurl}/commonProducts?_id=${id}`)
            .then(res =>{
                this.setState({product:res.data.product_details[0],loading:false})
                this.setState({fullImage:`${api.baseurl}/`+ this.state.product.subImages_id.product_subImages[0]})
            })
            .catch((err)=> {
                console.log(err)
                sweetalert("No Product Detail Found",{button:false})
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
                console.log(err)
                sweetalert("No Product Detail Found",{button:false})
                this.props.history.push("/productsPage")
            })
        }
    }
 
    imageChangeHandler(e) {
        this.setState({fullImage:e.target.src})
      }

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

        }
        else{
            this.setState({
                type:'warning',
                message:"Product already in present in cart",
                open:true
            })
        }
    }

    handleClose = () => {
        this.setState({show:false})
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        this.setState({
            open:false
        })
    };

    handleShow = () => {
        if(!localStorage.getItem('userToken')) {
            sweetalert('',"Login Required",'warning',{button:false})
            .then((value) => {
                switch (value) {
                  default:
                    this.props.history.push('/login')
                }
            });
        } 
        else {
            this.setState({show:true})
        }
    }

    handleRating = (value) => {
        this.setState({newRating:value})
    }

    handleSubmitRating = (product_id) => {
        if(this.state.newRating!==0) {
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
                // alert("Product Rating Submitted")
            })
            .catch((err)=> {
                this.setState({loader:false,open:true})
                if (err.response) {
                this.setState({
                    message: (err.response.data.message)?err.response.data.message:`Encountered an Error: ${err.response.status}..${err.response.statusText}`,
                    type: 'error',
                })
                // alert(error.response.data.message)
                } else if (err.request) {
                    alert(err.request);
                } else {
                    alert('Error', err.message);
                }
                alert('Encounted Problem while Updating address  ',this.state.message )     
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

        // if (this.state.loading) {
        //     return <div className="div-default"><Loading loading loaderColor="#3498db" /></div>;
        // }

        return (
            <>
            <Header/>
            {(this.state.loading)
            ?<div className="div-default"><Loading loading loaderColor="#3498db" /></div>
            :
            <div className="container pad">
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="">
                                {/* <SideBySideMagnifier 
                                    imageSrc={this.state.fullImage}
                                    zoomPosition="right"
                                /> */}
                                <img className="fullImage img-responsive" src={this.state.fullImage} alt="FullImage"/>
                            </div>
                        </div>
                        <div className="row">
                            {product_subImage.map(subimage => (
                                <div key={subimage} className='col'>
                                    <img className="subImage" src={`${api.baseurl}/`+subimage} alt="SubImages" onClick={(subimage) =>this.imageChangeHandler(subimage)} />
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

export default ProductDetail
