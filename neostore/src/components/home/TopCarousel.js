import React, { Component } from 'react'
import Carousel from './Carousel'
import RBCarousel from "react-bootstrap-carousel";
import * as api from '../../api'
import axios from 'axios'
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

// const icon_glass = <span className="fa fa-glass" />;
// const icon_music = <span className="fa fa-music" />;

class TopCarousel extends Component {
    constructor() {
        super();
        this.state ={
            carousel_img:[]
        }
    }
    
    componentDidMount(){
        axios.get(`${api.baseurl}/getAllCategories`)
        .then((res)=>{
            this.setState({carousel_img:res.data.category_details})
        })
        .catch((err)=> {
            alert("Wrong API call")
        })
    }

    // onSelect = (active, direction) => {
    //     console.log(`active=${active} && direction=${direction}`);
    // };
    // visiableOnSelect = active => {
    //     console.log(`visiable onSelect active=${active}`);
    // };
    // slideNext = () => {
    //     this.slider.slideNext();
    // };
    // slidePrev = () => {
    //     this.slider.slidePrev();
    // };
    // goToSlide = () => {
    //     this.slider.goToSlide(1);
    // };
    // autoplay = () => {
    //     this.setState({ autoplay: !this.state.autoplay });
    // };
    // _changeIcon = () => {
    //     let { leftIcon, rightIcon } = this.state;
    //     leftIcon = leftIcon ? undefined : icon_glass;
    //     rightIcon = rightIcon ? undefined : icon_music;
    //     this.setState({ leftIcon, rightIcon });
    // };

    render() {
        return (
            <div className="container-fullwidth">
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
            </div>
        )
    }
}

export default TopCarousel
