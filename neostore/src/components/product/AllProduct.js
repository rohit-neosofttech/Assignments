import React, { Component } from 'react'
import axios from 'axios'
import ProductsCard from './ProductsCard';
import Pagination from './Pagination';
import * as api from '../../api'


class AllProduct extends Component {
    constructor(props) {
        super(props);
        this.state={
            products:[],
            loading:true,
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
        axios.get(`${api.baseurl}/commonProducts`)
        .then((res)=>{
            this.setState({
                products:res.data.product_details,
                categoryName:"All Categories",
                loading:false,
                prodLen:res.data.product_details.length
            })
        })
        .catch((err)=> {
            alert("Invalid componentDidMount API call")
            this.setState({error:!this.state.error})

        })
    }

    componentDidUpdate(prevProps,prevState){
        // console.log(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
        if (this.props !== prevProps || this.state.pageNo!== prevState.pageNo) {
             axios.get(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
            .then((res)=>{
                this.setState({
                    products:res.data.product_details,
                    categoryName:res.data.product_details[0].category_id.category_name,
                    loading:false
                })
            })
            .catch((err)=> {
                // console.log(err)
                // alert("Invalid componentDidUpdate API call")
                this.setState(prevState => ({
                    error: !prevState.error
                  }));
            })
          }
          if (this.state.pageNo!== prevState.pageNo) {
            axios.get(`${api.baseurl}/commonProducts?category_id=${this.props.categoryId}&color_id=${this.props.colorId}&sortBy=${this.props.sortBy}&sortIn=${this.props.sortIn}&pageNo=${this.state.pageNo}&perPage=${this.state.perPage}`)
           .then((res)=>{
               this.setState({
                   products:res.data.product_details,
                   categoryName:res.data.product_details[0].category_id.category_name,
                   loading:false
               })
           })
           .catch((err)=> {
               // console.log(err)
               // alert("Invalid componentDidUpdate API call")
               this.setState(prevState => ({
                   error: !prevState.error
                 }));
           })
         }
    }

    render() {

        // const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        // const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        // const currentPosts = this.state.products.slice(indexOfFirstPost, indexOfLastPost);

        const paginate = pageNumber => this.setState({pageNo:pageNumber})

        return (
            <div className='container'>
                {/* {alert(this.state.error)} */}
                {(this.state.products==="No details are available") ? <h1 className="center">No Product Found</h1> :
                <>
                    {/* {console.log(this.state.products)} */}
                    <div className="row">
                        <ProductsCard products={this.state.products} loading={this.state.loading} error={this.state.error}/>
                    </div>

                    <Pagination
                        postsPerPage={this.state.perPage}
                        totalPosts={this.state.prodLen}
                        paginate={paginate}
                    />
                </>
                }
            </div>
        )
    }
}

export default AllProduct
