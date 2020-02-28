import React, { Component } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard';
import Pagination from './Pagination';
import * as api from '../../api'

import CircularProgress from '@material-ui/core/CircularProgress';

class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            // loading:true,
            loader:false,
            currentPage:1,
            // postsPerPage:8,
            categoryName:'',
            // categoryId:'',
            // colorId:'',
            // sortBy:'',
            // sortIn:'',
            pageNo:1,
            perPage:8,
            error:false,
            prodLen:''
        }
    }

    componentDidMount() {
        // axios.get(`${api.baseurl}/commonProducts`)
        // .then((res)=>{
        //     this.setState({
        //         products:res.data.product_details,
        //         categoryName:"All Categories",
        //         loading:false,
        //         prodLen:res.data.product_details.length
        //     })
        // })
        // .catch((err)=> {
        //     alert("Invalid componentDidMount API call")
        //     this.setState({error:!this.state.error})

        // })
    }

    componentDidUpdate(prevProps,prevState){
        // console.log(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
        if (this.props !== prevProps || this.state.pageNo!== prevState.pageNo) {
            this.setState({loader:true,error:false})
             axios.get(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
            .then((res)=>{
                this.setState({
                    products:res.data.product_details,
                    categoryName:res.data.product_details[0].category_id.category_name,
                    prodLen:res.data.total_count,
                    // loading:false,
                    loader:false
                })
            })
            .catch((err)=> {
                this.setState({
                    products:[],
                    categoryName:'',
                    error: true
                  });
            })
        }
        if (this.state.pageNo!== prevState.pageNo) {
            this.setState({loader:true,error:false})
            axios.get(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
           .then((res)=>{
               this.setState({
                   products:res.data.product_details,
                   categoryName:res.data.product_details[0].category_id.category_name,
                   prodLen:res.data.total_count,
                //    loading:false,
                   loader:false
               })
           })
           .catch((err)=> {
               this.setState({
                    categoryName:'',
                    error: true,
                    products:[]
                 });
           })
         }
    }

    sortByRating = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInHighestRating`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Highest Rated Product",
                prodLen:res.data.total_count,
                // loading:false,
                loader:false
            })
        })
        .catch((err)=> {
            this.setState({
                categoryName:'',
                error: true
              });
        })
    }

    sortByAscending = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInDescending`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Products In Descending by Cost",
                prodLen:res.data.total_count,
                // loading:false,
                loader:false
            })
        })
        .catch((err)=> {
            this.setState({
                categoryName:'',
                error: true
              });
        })
    }

    sortByDescending = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInAscending`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Products In Ascending by Cost",
                prodLen:res.data.total_count,
                // loading:false,
                loader:false
            })
        })
        .catch((err)=> {
            this.setState({
                categoryName:'',
                error: true
              });
        })
    }

    render() {

        // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        // const currentPosts = this.state.products.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNumber => this.setState({pageNo:pageNumber})

        return (
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-8 text-align-left">
                    {
                        (this.props.categoryId!=='') ? <h3>{this.state.categoryName}</h3>:<h3>All Categories</h3>
                    }
                    {/* <h3>All Categories</h3> */}
                    </div>
                    <div className="col-md-4" style={{marginLeft:"auto"}}>
                        Sort By:
                        <button className="btn-sortBy" onClick={this.sortByRating}><i id="icon-blue" className="fas fa-star"></i></button>
                        <button className="btn-sortBy" onClick={this.sortByAscending}><i id="icon-blue" className="fas fa-arrow-up" >&#8377;</i></button>
                        <button className="btn-sortBy" onClick={this.sortByDescending}><i id="icon-blue" className="fas fa-arrow-down" >&#8377;</i></button>
                    </div>
                </div>
                <div className="row">
                {this.state.loader
                ? 
                    <> 
                    {
                        this.state.error 
                        ? <div className="div-default"><h1 className="center">No Product Found</h1></div> 
                        :
                        <div className='center' style={{margin:'auto',height:'400px',width:'100%'}}>
                            <br/><br/><br/><br/>
                            <CircularProgress />
                        </div>
                    }
                    </>
                :
                    <div className='container'>
                        <>
                            <div className="row">
                                {/* <ProductsCard products={this.state.products} loading={this.state.loading} error={this.state.error}/> */}
                                <ProductsCard products={this.state.products} />
                            </div>

                            <Pagination
                                postsPerPage={this.state.perPage}
                                totalPosts={this.state.prodLen}
                                paginate={paginate}
                            />
                        </>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default AllProduct
