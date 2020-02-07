import React, { Component } from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'
// import AllProduct from  './AllProduct'
import Product from  './Product'
import ProductsFilter from './ProductsFilter'


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
            categoryId:'',
            colorId:'',
            nocolor:false
        }
    }
    componentDidMount() {
        axios.get(`http://180.149.241.208:3022/getAllCategories`)
        .then((res)=>{
            // console.log(res.data.category_details)
            this.setState({categories:res.data.category_details})
        })
        .catch((err)=> {
            console.log(err)
        })

        axios.get(`http://180.149.241.208:3022/getAllColors`)
        .then((res)=>{
            // console.log(res.data.color_details)
            this.setState({colors:res.data.color_details})
        })
        .catch((err)=> {
            this.setState({nocolor:true})
        })
    }

    handleClickCatergory = () => {
        this.setState({Catopen:!this.state.Catopen});
    };
    
    handleClickColor = () => {
        this.setState({Colopen:!this.state.Colopen});
    };

        render() {
        const {categories}=this.state
        const categories_list=categories.map(category =>
            <Link to={'/productsPage/' + category.category_id} key={category.category_id}>
                <ListItem className="list-item-hr" button onClick={()=>this.setState({categoryId:category.category_id})}>
                    {category.category_name}
                </ListItem>
            </Link>)

        // const {colors}=this.state

        // const colors_list=colors.map(color =>
        //     <button className="color-pallet" style={{backgroundColor:`${color.color_code}`}} key={color.color_id} onClick={()=>this.setState({colorId:color.color_id})}/>)
    //     // const colors_list
    //    {this.state.colors.length === 0 ? <h4>No color</h4> : {colors_list=this.state.colors.map(color =>
    //         <button className="color-pallet" style={{backgroundColor:`${color.color_code}`}} key={color.color_id} onClick={()=>this.setState({colorId:color.color_id})}/>)}}
        
        
        return (
            <div>
                <br/><hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            {/* <ProductsFilter/> */}
                            <div className="row card card-full">
                                <List className="" >
                                    <Link to="/productsPage" ><ListItem button>All Product</ListItem></Link>
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
                                            {categories_list}
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
                                            {this.state.colors.length === 0 ? <h4>No color</h4> :
                                        this.state.colors.map(color =><button className="color-pallet" style={{backgroundColor:`${color.color_code}`}}
                                         key={color.color_id} onClick={()=>this.setState({colorId:color.color_id})}/>)}
                                            {/* {colors_list} */}
                                        </List>
                                    </Collapse>
                                </List>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <Product categoryId={this.state.categoryId} colorId={this.state.colorId}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductsPage
