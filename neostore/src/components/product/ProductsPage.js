import React, { Component } from 'react'
import Header from '../header/Header'
import axios from 'axios'

import {Link} from 'react-router-dom'
import AllProduct from  './AllProduct'
// import Product from  './Product'
// import ProductsFilter from './ProductsFilter'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            colors: [],
            Catopen : false,
            Colopen : false,
            categoryId:(props.location.state) ? props.location.state.category_id : '',
            colorId:'',
            sortIn:'',
            sortBy:'',
            categoryName:(props.location.state) ? props.location.state.category_name : ''
        }
    }
    componentDidMount() {
        axios.get(`http://180.149.241.208:3022/getAllCategories`)
        .then((res)=>{
            this.setState({categories:res.data.category_details})
        })
        .catch((err)=> {
            alert("Invalid API call")
        })

        axios.get(`http://180.149.241.208:3022/getAllColors`)
        .then((res)=>{
            this.setState({colors:res.data.color_details})
        })
        .catch((err)=> {
            alert("Invalid API call")
        })
    }

    handleClickCatergory = () => {
        if(this.state.Catopen) {
            this.setState({categoryId:'',Catopen:false});
        }
        else {
            this.setState({Catopen:true});
        }
        // this.setState({Catopen:!this.state.Catopen});

    };
    
    handleClickColor = () => {
        if(this.state.Colopen) {
            this.setState({colorId:'',Colopen:false});
        }
        else {
            this.setState({Colopen:true});
        }
        // this.setState({Colopen:!this.state.Colopen});
    };

    handleAllProduct = () => {
        this.setState({
            categoryId:'',
            colorId:'',
            sortIn:'',
            sortBy:'',
            categoryName:''
        });
    }
    render() {
        return (
            <>
            <Header/>
            <div>
                <br/><hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            {/* <ProductsFilter/> */}
                            <div className="row card card-full">
                                <List className="" >
                                    <Link to="/productsPage" ><ListItem button onClick={this.handleAllProduct.bind(this)}>All Product</ListItem></Link>
                                </List>      
                            </div>
                            <div className="row card card-full">
                                <List className="">
                                    <ListItem button onClick={this.handleClickCatergory.bind(this)}>
                                        <label>Categories</label>
                                        {this.state.Catopen===false ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.Catopen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            { 
                                            (this.state.categories.length === 0) ? <h5>No Categories found</h5> : 
                                            this.state.categories.map(category =>
                                                <Link to={'/productsPage/' + category.category_id} key={category.category_id}>
                                                    <ListItem className="list-item-hr" button onClick={()=>this.setState({categoryId:category.category_id, categoryName:category.category_name})}>
                                                        {category.category_name}
                                                    </ListItem>
                                                </Link>)
                                            }
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                            <div className="row card card-full">
                                <List className="">
                                    <ListItem button onClick={this.handleClickColor.bind(this)}>
                                        <label>Color</label>
                                        {this.state.Colopen===false  ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.Colopen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {
                                            (this.state.colors.length === 0) ? <h4>No color</h4> :
                                            this.state.colors.map(color => 
                                                <button className="color-pallet" style={{backgroundColor:`${color.color_code}`}}
                                                key={color.color_id} onClick={()=>this.setState({colorId:color.color_id})}/>)
                                            }
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                        </div>
                        <AllProduct categoryId={this.state.categoryId} colorId={this.state.colorId}
                        sortBy={this.state.sortBy} sortIn={this.state.sortIn}/>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default ProductsPage
