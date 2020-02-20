import React, { Component } from 'react'
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
        this.setState({Catopen:!this.state.Catopen});
    };
    
    handleClickColor = () => {
        this.setState({Colopen:!this.state.Colopen});
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
                                        {this.state.Catopen ? <ExpandLess /> : <ExpandMore />}
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
                                        {this.state.Colopen ? <ExpandLess /> : <ExpandMore />}
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
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-8 text-align-left">
                                {
                                    (this.state.categoryId!=='') ? <h3>{this.state.categoryName}</h3>:<h3>All Categories</h3>
                                }
                                {/* <h3>All Categories</h3> */}
                                </div>
                                <div className="col-md-4" style={{marginLeft:"auto"}}>
                                    Sort By:
                                    <i id="icon-blue" class="fas fa-star" onClick={()=>this.setState({sortBy:"Rating"})}></i>
                                    <i id="icon-blue" class="fas fa-arrow-up" onClick={()=>this.setState({sortBy:"Cost",sortIn:'true'})}>&#8377;</i>
                                    <i id="icon-blue" class="fas fa-arrow-down" onClick={()=>this.setState({sortBy:"cost",sortIn:'false'})}>&#8377;</i>
                                </div>
                            </div>
                            <div className="row">
                                <AllProduct categoryId={this.state.categoryId} colorId={this.state.colorId}
                                sortBy={this.state.sortBy} sortIn={this.state.sortIn}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsPage
