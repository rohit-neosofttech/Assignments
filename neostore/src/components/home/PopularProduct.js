import React, { PureComponent } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import * as api from '../../api'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import sweetalert from 'sweetalert'

class PopularProduct extends PureComponent {
    constructor() {
        super();
        this.state={
            product_details:[],
            loader:false
        }
    }
    _isMounted = false;

    /**
     * API call for Top Rated Product and setting the state
   */
    componentDidMount(){
        this._isMounted = true;
        this.setState({loader:true})
        if(this._isMounted) {
            axios.get(`${api.baseurl}/defaultTopRatingProduct`)
            .then((res)=>{
                this.setState({product_details:res.data.product_details , loader:false})
            })
            .catch((err)=> {
                // console.log('Popular Product Invalid API call')
                this.setState({loader:false})
                if (err.response) {
                    err.response.data.message 
                    ? sweetalert("Oops!", `${err.response.data.message}`, "error",{button:false})
                    : sweetalert("Oops!", 'Something Went Wrong getting Top Rating Product', "error",{button:false})
            
                    // alert(error.response.data.message)
                } else if (err.request) {
                    sweetalert("Oops!", `${err.request}`, "error",{button:false})
                } else {
                    sweetalert("Oops!", `${err.message}`, "error",{button:false})
                }
            })
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }
    
    render() {
        return (
            <div className="container">
                <h3 className="center">Popular Product</h3>
                <p className="center"><Link to="/productspage" data-tip="Displays All the Product">View All</Link></p><br/>
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
                    <ReactTooltip />
            </div>
        )
    }
}

export default PopularProduct
