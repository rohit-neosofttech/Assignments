import React, { Component } from 'react'
import Carousel from './Carousel'
import RBCarousel from "react-bootstrap-carousel";
import * as api from '../../api'
import axios from 'axios'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import CircularProgress from '@material-ui/core/CircularProgress';

class TopCarousel extends Component {
    constructor() {
        super();
        this.state ={
            carousel_img:[],
            loader:false
        }
    }
    
    componentDidMount(){
        this.setState({loader:true})
        axios.get(`${api.baseurl}/getAllCategories`)
        .then((res)=>{
            this.setState({carousel_img:res.data.category_details , loader:false})
        })
        .catch((err)=> {
            alert("Wrong API call")
        })
    }

    render() {
        return (
            <div className="container-fullwidth">
                {this.state.loader
                ? 
                    <div className="center" >
                        <CircularProgress/>
                    </div>
                :
                    <RBCarousel
                    animation={true}
                    autoplay={this.state.autoplay}
                    slideshowSpeed={2000}
                    defaultActiveIndex={0}
                    leftIcon={this.state.leftIcon}
                    rightIcon={this.state.rightIcon}
                    onSelect={this._onSelect}
                    ref={r => (this.slider = r)}
                    version={4}
                    >
                    { (this.state.carousel_img.length !==0 ) ?
                        this.state.carousel_img.map( carousel => <Carousel key={carousel.category_id} carousel={carousel} />)
                        : <></>
                    }
                    </RBCarousel>
                }
            </div>
        )
    }
}

export default TopCarousel
