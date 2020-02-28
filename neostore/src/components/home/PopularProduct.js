import React, { PureComponent } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import * as api from '../../api'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

class PopularProduct extends PureComponent {
    constructor() {
        super();
        this.state={
            product_details:[],
            loader:false,
            open:false
        }
    }

    componentDidMount(){
        this.setState({loader:true})
        axios.get(`${api.baseurl}/defaultTopRatingProduct`)
        .then((res)=>{
            this.setState({product_details:res.data.product_details , loader:false})
        })
        .catch((err)=> {
            console.log('Popular Product Invalid API call')
            this.setState({loader:false,open:true})
                if (err.response) {
                this.setState({
                    message: (err.response.data.message)?err.response.data.message:`Address Edit Error: ${err.response.status}..${err.response.statusText}`,
                    type: 'error',
                    title: 'Address Edit Error'
                })
                // alert(error.response.data.message)
                } else if (err.request) {
                    alert(err.request);
                } else {
                    alert('Error', err.message);
                }
                alert('Encounted Problem while Updating address  ',this.state.message )
        })
    }

    render() {
        return (
            <div className="container">
                <h3 className="center">Popular Product</h3>
                <p className="center"><Link to="/productspage">View All</Link></p><br/>
                    <div className="row">
                    {this.state.loader
                    ? 
                        <div className="center" >
                            <CircularProgress/>
                        </div>
                    :
                    <>
                        { (this.state.product_details.length !==0) ? 
                        <>
                                { this.state.product_details.map(product =>
                                    <ProductCard key={product._id} product={product}></ProductCard>
                                )}
                        </>
                        : 
                            <h1 className="center" style={{color:"#fb4646"}}><br/><em>No Popular Product found</em></h1>
                        }
                    </>
                    }
                    </div>
            </div>
        )
    }
}

export default PopularProduct
