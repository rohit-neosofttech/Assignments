import React, { Component } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard';
import * as api from '../../api'
import ReactTooltip from 'react-tooltip'
import Loading from 'react-fullscreen-loading';
import Pagination from "react-js-pagination";

class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            loader:false,
            postsPerPage:8,
            categoryName:'',
            error:false,
            prodLen:'',
            activePage: 1
        }
    }

    /**
     * The component will re-render if the user select any combination of the categories & color.
     * API call will be based on the props received from the ProductPage component  and set the state of the products array.
     * 
     * @param prevProps     defines the previous props of the component
     * @param prevState     defines the previous state of the component
     */
    componentDidUpdate(prevProps,prevState){
        if (this.props !== prevProps) {
            this.setState({loader:true,error:false})
             axios.get(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}`)
            .then((res)=>{
                this.setState({
                    products:res.data.product_details,
                    categoryName:res.data.product_details[0].category_id.category_name,
                    prodLen:res.data.total_count,
                    activePage:1,
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
    }

    /**
     * Axios API call to sort the product by rating and set the state of the products array.
     */
    sortByRating = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInHighestRating`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Highest Rated Product",
                prodLen:res.data.total_count,
                activePage:1,
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

    /**
     * Axios API call to sort the product in accending order by cost and set the state of the products array.
     */
    sortByAscending = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInAscending`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Products In Ascending by Cost",
                prodLen:res.data.total_count,
                activePage:1,
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

    /**
     * Axios API call to sort the product in accending order by cost and set the state of the products array.
     */
    sortByDescending = () => {
        this.setState({loader:true,error:false})
        axios.get(`${api.baseurl}/getAllProductsInDescending`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"Products In Descending by Cost",
                prodLen:res.data.total_count,
                activePage:1,
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

    /**
     * handle the page change of the pagination and set the state of activePage to the pageNumber 
     * which is been seleted.
     * 
     * @param pageNumber  contain the page number which the user select on the pagination  
     */
    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    render() {

        const indexOfLastPost = this.state.activePage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.products.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-8 text-align-left">
                    {
                        (this.props.categoryId!=='') ? <h3>{this.state.categoryName}</h3>:<h3>All Categories</h3>
                    }
                    </div>
                    <div className="col-md-4" style={{marginLeft:"auto"}}>
                        Sort By:
                        <button className="btn-sortBy" onClick={this.sortByRating}><i id="icon-blue" className="fas fa-star" data-tip="Sort By Rating"></i></button>
                        <button className="btn-sortBy" onClick={this.sortByAscending}><i id="icon-blue" className="fas fa-arrow-up" data-tip="Sort By Ascending">&#8377;</i></button>
                        <button className="btn-sortBy" onClick={this.sortByDescending}><i id="icon-blue" className="fas fa-arrow-down" data-tip="Sort By Descending">&#8377;</i></button>
                    </div>
                    <ReactTooltip />
                </div>
                <div className="row">
                {this.state.loader
                ? 
                    <> 
                    {
                        this.state.error 
                        ? 
                        <div className="center" style={{height:"300px"}}>
                            <br/><br/><br/><br/>
                            <img src="https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/12/1450973046wordpress-errors.png" alt="Error Icon" style={{height:'200px'}}/>
                            <h1 className="center" style={{color:'#ff5b5b'}}>No Product Found</h1>
                        </div> 
                        :
                        <div className="div-default">
                            <Loading loading loaderColor="#3498db" />
                        </div>
                    }
                    </>
                :
                    <div className='container'>
                        <>
                            <div className="row">
                                <ProductsCard products={currentPosts} />
                            </div>
                            <br/><br/>
                            <Pagination
                                activePage={this.state.activePage}
                                itemsCountPerPage={8}
                                totalItemsCount={this.state.products.length}
                                pageRangeDisplayed={5}
                                onChange={this.handlePageChange.bind(this)}
                                />
                            <br/><br/>
                        </>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default AllProduct
