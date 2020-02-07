import React, { Component } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard';
import Pagination from './Pagination';


class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            posts:[],
            loading:true,
            currentPage:1,
            postsPerPage:8,
            categoryName:''
        }
    }

    componentDidMount(){
        axios.get(`http://180.149.241.208:3022/commonProducts`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"All Categories",
                loading:false
            })
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    
    render() {

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.products.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNumber => this.setState({currentPage:pageNumber})

        return (
            <div className='container'>
                {/* {console.log(props)} */}
                <div className="row">
                    <div className="col-md-8 text-align-left">
                    {(this.props.categoryId!==null || this.props.categoryId!==undefined)? <h3>{this.state.categoryName}</h3>:<h3>All Categories</h3>}
                    {/* <h3>All Categories</h3> */}
                    </div>
                    <div className="col-md-4" style={{marginLeft:"auto"}}>
                    Sort By:
                    <i id="icon-blue" class="fas fa-star" ></i>
                    <i id="icon-blue" class="fas fa-arrow-up" >&#8377;</i>
                    <i id="icon-blue" class="fas fa-arrow-down" >&#8377;</i>
                    </div>
                </div>
                
                <div className="row">
                    <ProductsCard products={currentPosts} loading={this.state.loading} />
                </div>
                <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.products.length}
                    paginate={paginate}
                />
            </div>
        )
    }
}

export default AllProduct
