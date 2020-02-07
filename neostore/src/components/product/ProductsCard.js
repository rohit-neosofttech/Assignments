// NEw Card with loading
import React from 'react';
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import * as api from '../../api'

import Loading from 'react-fullscreen-loading';

const ProductsCard = ({ products, loading, error }) => {
  if (loading) {
    return <Loading loading loaderColor="#3498db" />;
  }

  return (
    <>{
        (error) ? <h3>No Product Found</h3> :
        <>
          {products.map(product => (
            <div key={product.product_id} className='col-sm-4'>
              <div className='cards'>
                <img className={'cardimage'} src={`${api.baseurl}/`+product.product_image} alt="Card Images"/>
                <label><Link to={'/productdetail/' + product.product_id} style={{color:"#3368bb"}}>{product.product_name}</Link></label>
                <div className="bottomCenter">
                  <label><strong>&#8377; {product.product_cost}</strong></label><br/>
                  <button className="btn-add">Add to Cart</button><br/>
                  <Rating name="rating" precision={0.1} value={Number(product.product_rating)} disabled />
                </div>
              </div>
            </div>
          ))}
        </>
      }
    </>
  );
};

export default ProductsCard
