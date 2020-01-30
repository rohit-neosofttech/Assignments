import React, { PureComponent } from 'react'
import axios from 'axios'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class ProductsFilter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            categories : [],
            colors: [],
            Catopen : false,
            Colopen : false
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
            console.log(err)
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
            <ListItem className="list-item-hr" button key={category.category_id}>
                {category.category_name}
            </ListItem>)
        // console.log(categories_list)

        const {colors}=this.state
        const colors_list=colors.map(color =>
        <button className="color-pallet" style={{backgroundColor:`${color.color_code}`}} key={color.color_id}/>)
        // console.log(categories_list)
        
        return (
            <>
                <div className="row card card-full">
                    <List className="" >
                        <ListItem button>AllProduct</ListItem>
                    </List>      
                </div>
                <div class="row card card-full">
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
                <div class="row card card-full">
                    <List className="">
                        <ListItem button onClick={this.handleClickColor.bind(this)}>
                            <label>Color</label>
                            {this.state.Colopen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.Colopen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {colors_list}
                            </List>
                        </Collapse>
                    </List>
                </div>
            </>
        )
    }
}

export default ProductsFilter
